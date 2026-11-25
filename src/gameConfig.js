// ==========================
// 설정 파일 — 여기만 채우면 돼요!
// ==========================

// 1) Firebase 웹 앱 설정값
//    Firebase 콘솔 → 프로젝트 설정 → 내 앱(웹) → "SDK 설정 및 구성"에서 복사해 붙여 넣으세요.
//    databaseURL 이 비어 있으면 "혼자 테스트 모드"로 동작해요.
//    (같은 컴퓨터·같은 브라우저의 탭끼리만 연동, 휴대폰과는 연동 안 됨)
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// 2) 게임 방 이름 — 캠프마다 바꾸면 지난 캠프 기록과 섞이지 않아요.
export const GAME_ID = "christmas-2026";

// 3) 팀 비밀번호 (선택)
//    다른 팀이 우리 팀 칸에 입력하지 못하게 하려면 숫자를 적어 주세요.
//    예) { 1: "1225", 2: "0716", 3: "3388", 4: "5821", 5: "9043", 6: "2614" }
//    null 이면 비밀번호 없이 바로 들어가요.
export const TEAM_PINS = null;
