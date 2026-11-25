// ==========================
// 큰 화면 · 팀 입력 화면이 같이 쓰는 기본 데이터
// (수익률은 정답이라 여기 두지 않아요 → src/data/rates.js)
// ==========================

export const emotions = [
  "탐욕", "사랑", "질투", "믿음",
  "분노", "용기", "나태", "희망",
  "슬픔", "절제", "두려움", "화합"
];

export const teams = [1, 2, 3, 4, 5, 6];

export const TOTAL_ROUNDS = 10;
export const START_MONEY = 1000000;

export const newsByRound = {
  1: "세 개의 집 앞에 같은 바람이 불었지만, 결과는 모두 달랐다.",
  2: "장벽 앞에 묶인 무리, 그림자가 다가온다.",
  3: "거리의 노래 한 줄이 권력자를 흔들었다.",
  4: "서로 모르는 두 사람이 같은 날 하늘을 올려다보았다.",
  5: "기록자는 사라지고 있음을 느꼈다.",
  6: "위험한 길 위에서 누군가 쓰러졌다.",
  7: "유산 정리가 끝난 집, 잔치 음악 소리와 거친 불만이 동시에 터져 나온다.",
  8: "닫힌 무덤 앞, 방문객이 눈물을 흘렸다.",
  9: "숨었던 사람들이 밖으로 나와 말하기 시작했다.",
  10: "어둠 속 항구에서 거액이 오갔다."
};

// 숫자 포맷
export const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value);
  if (isNaN(num)) return "";
  return num.toLocaleString();
};

// 입력칸 문자열 → 숫자 (숫자가 아니면 null)
export const parseAmount = (value) => {
  const raw = String(value).replace(/,/g, "");
  if (raw === "") return 0;
  if (!/^\d+$/.test(raw)) return null;
  return Number(raw);
};

export const teamKey = (team) => `team${team}`;
export const roundKey = (round) => `r${round}`;

export const sumAmounts = (amounts = {}) =>
  Object.values(amounts).reduce((sum, v) => sum + Number(v || 0), 0);
