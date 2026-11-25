// ==========================
// 게임 데이터 동기화
// - Firebase 설정이 있으면: Firebase Realtime Database (휴대폰 ↔ 큰 화면 실시간)
// - 없으면: 이 브라우저의 localStorage (같은 브라우저의 탭끼리만 연동, 테스트용)
//
// 데이터 모양
// games/{GAME_ID} = {
//   state: { round, showResult, gameEnd, balances: { team1.. }, profits: { team1.. } },
//   inv:   { r1: { team1: { amounts: { 탐욕: 10000, .. }, submitted: true } } }
// }
// ==========================

import { useEffect, useState } from "react";
import { firebaseConfig, GAME_ID } from "../gameConfig";
import { teams, teamKey, START_MONEY } from "../data/game";

export const isFirebaseMode = Boolean(firebaseConfig.databaseURL);

const ROOT = `games/${GAME_ID}`;

// ---------- 기본값 채우기 ----------
const defaultBalances = () =>
  Object.fromEntries(teams.map((t) => [teamKey(t), START_MONEY]));

export const normalizeGame = (raw) => {
  const state = raw?.state || {};
  return {
    round: state.round || 1,
    showResult: Boolean(state.showResult),
    gameEnd: Boolean(state.gameEnd),
    balances: { ...defaultBalances(), ...(state.balances || {}) },
    profits: state.profits || {},
    inv: raw?.inv || {}
  };
};

// ---------- 경로 유틸 (local 모드용) ----------
const setIn = (obj, path, value) => {
  const keys = path.split("/");
  const next = { ...(obj || {}) };
  let cur = next;
  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      if (value === null || value === undefined) delete cur[k];
      else cur[k] = value;
    } else {
      cur[k] = { ...(cur[k] || {}) };
      cur = cur[k];
    }
  });
  return next;
};

// ==========================
// local 백엔드
// ==========================
const LOCAL_KEY = `christmas-game:${GAME_ID}`;
const localListeners = new Set();

const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || null;
  } catch {
    return null;
  }
};

const writeLocal = (data) => {
  try {
    if (data) localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    else localStorage.removeItem(LOCAL_KEY);
  } catch {
    // 저장 실패해도 화면은 계속 동작
  }
  localListeners.forEach((cb) => cb(data));
};

if (!isFirebaseMode && typeof window !== "undefined") {
  // 다른 탭에서 바뀐 내용 반영
  window.addEventListener("storage", (e) => {
    if (e.key === LOCAL_KEY) {
      const data = readLocal();
      localListeners.forEach((cb) => cb(data));
    }
  });
}

const localBackend = {
  subscribe(cb) {
    localListeners.add(cb);
    cb(readLocal());
    return () => localListeners.delete(cb);
  },
  subscribeConnection(cb) {
    cb(true);
    return () => {};
  },
  async update(paths) {
    let data = readLocal();
    Object.entries(paths).forEach(([path, value]) => {
      data = setIn(data, path, value);
    });
    writeLocal(data);
  },
  async reset() {
    writeLocal(null);
  }
};

// ==========================
// Firebase 백엔드 (설정이 있을 때만 불러옴)
// ==========================
let firebasePromise = null;
const loadFirebase = () => {
  if (!firebasePromise) {
    firebasePromise = Promise.all([
      import("firebase/app"),
      import("firebase/database")
    ]).then(([appMod, dbMod]) => {
      const app = appMod.initializeApp(firebaseConfig);
      const db = dbMod.getDatabase(app);
      return { db, ...dbMod };
    });
  }
  return firebasePromise;
};

const firebaseBackend = {
  subscribe(cb) {
    let unsub = () => {};
    let cancelled = false;
    loadFirebase().then(({ db, ref, onValue }) => {
      if (cancelled) return;
      unsub = onValue(ref(db, ROOT), (snap) => cb(snap.val()));
    });
    return () => {
      cancelled = true;
      unsub();
    };
  },
  subscribeConnection(cb) {
    let unsub = () => {};
    let cancelled = false;
    loadFirebase().then(({ db, ref, onValue }) => {
      if (cancelled) return;
      unsub = onValue(ref(db, ".info/connected"), (snap) => cb(Boolean(snap.val())));
    });
    return () => {
      cancelled = true;
      unsub();
    };
  },
  async update(paths) {
    const { db, ref, update } = await loadFirebase();
    await update(ref(db, ROOT), paths);
  },
  async reset() {
    const { db, ref, remove } = await loadFirebase();
    await remove(ref(db, ROOT));
  }
};

const backend = isFirebaseMode ? firebaseBackend : localBackend;

// ==========================
// 외부에서 쓰는 함수
// ==========================

// 여러 경로를 한 번에 저장. 값이 null 이면 삭제.
// 예) updateGame({ "state/round": 2, "state/showResult": false })
export const updateGame = (paths) =>
  backend.update(paths).catch((err) => {
    console.error("게임 데이터 저장 실패", err);
    alert("저장에 실패했어요. 인터넷 연결을 확인해 주세요.");
  });

export const resetGame = () => backend.reset();

// 게임 데이터 + 연결 상태를 구독하는 훅
export const useGame = () => {
  const [raw, setRaw] = useState(undefined);
  const [connected, setConnected] = useState(true);

  useEffect(() => backend.subscribe(setRaw), []);
  useEffect(() => backend.subscribeConnection(setConnected), []);

  return {
    ready: raw !== undefined,
    game: normalizeGame(raw),
    connected
  };
};
