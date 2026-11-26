import styled, { css } from "styled-components";

/* =========================
   전체
========================= */
export const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(12px, 3vw, 28px) clamp(8px, 2.5vw, 32px);
  padding-bottom: max(clamp(12px, 3vw, 28px), env(safe-area-inset-bottom));

  @media (min-width: 1024px) and (min-height: 540px) {
    height: 100vh;
    height: 100dvh;
    padding: 1.6vh 20px;
  }
`;

/* =========================
   메인 카드
========================= */
export const Card2 = styled.main`
  position: relative;
  width: 100%;
  max-width: 1700px;
  min-width: 0;
  overflow: hidden;
  padding: clamp(24px, 3vw, 32px) clamp(12px, 2.5vw, 28px) clamp(16px, 2.5vw, 24px);

  border-radius: 24px;
  background: var(--ivory);
  border: 2px solid var(--gold-300);
  box-shadow:
    0 0 0 6px rgba(217, 168, 78, 0.18),
    0 30px 60px rgba(0, 0, 0, 0.35);

  @media (min-width: 1024px) and (min-height: 540px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    padding: 2.6vh 24px 1.8vh;
  }
`;

export const Ribbon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: repeating-linear-gradient(
    -45deg,
    var(--berry-600) 0 14px,
    var(--snow) 14px 28px
  );
`;

/* =========================
   라운드 헤더
========================= */
export const RoundHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  margin-bottom: 12px;

  @media (min-width: 1024px) and (min-height: 540px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.8vh;
    margin-bottom: 0;
  }
`;

export const RoundTitle = styled.h2`
  font-family: "경기천년바탕_Regular", serif;
  font-size: clamp(22px, 4vw, 30px);
  letter-spacing: 0.06em;
  color: var(--pine-800);

  strong {
    color: var(--berry-600);
    font-size: 1.25em;
    margin-left: 4px;
  }
  small {
    margin-left: 6px;
    font-size: 0.6em;
    color: var(--ink-soft);
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(24px, 4vh, 38px);
  }
`;

export const RoundDots = styled.div`
  display: flex;
  gap: 6px;
`;

export const RoundDot = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: inset -2px -2px 0 rgba(0, 0, 0, 0.08);

  ${({ $state }) =>
    $state === "done" &&
    css`
      background: var(--pine-500);
      border-color: var(--pine-500);
    `}
  ${({ $state }) =>
    $state === "now" &&
    css`
      background: var(--berry-600);
      border-color: var(--gold-500);
      box-shadow: 0 0 0 3px rgba(217, 168, 78, 0.35);
    `}

  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

/* =========================
   뉴스
========================= */
export const newscards = styled.div`
  margin: 0 0 16px;
  padding: 14px 18px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid var(--line);
  border-left: 6px solid var(--berry-600);

  font-size: clamp(16px, 2.6vw, 20px);
  line-height: 1.55;
  color: var(--ink);
  word-break: keep-all;

  @media (min-width: 1024px) and (min-height: 540px) {
    margin: 0;
    padding: 1.4vh 20px;
    font-size: clamp(17px, 2.6vh, 24px);
  }
`;

export const NewsLabel = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--gold-500);
`;

/* =========================
   팀 현황
========================= */
export const TeamStatusWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 1.4vh;
  }
`;

export const TeamStatusCard = styled.div`
  position: relative;
  padding: 12px 10px 10px;
  text-align: center;
  border-radius: 16px;
  background: #fff;
  border: 1px solid var(--line);

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 50%;
    width: 36px;
    height: 4px;
    transform: translateX(-50%);
    border-radius: 0 0 4px 4px;
    background: var(--gold-500);
  }

  h4 {
    margin-bottom: 6px;
    font-family: "경기천년바탕_Regular", serif;
    font-size: clamp(17px, 2.4vw, 21px);
    color: var(--pine-800);
  }

  .money {
    margin-bottom: 2px;
    font-size: clamp(13px, 1.8vw, 16px);
    color: var(--ink-soft);
    font-variant-numeric: tabular-nums;
  }

  .remain {
    font-size: clamp(13px, 1.8vw, 16px);
    color: var(--pine-700);
    font-variant-numeric: tabular-nums;
  }
  .remain.up {
    color: #c62828;
  }
  .remain.down {
    color: #1e63b5;
  }

  ${({ $submitted }) =>
    $submitted &&
    css`
      border-color: var(--pine-500);
      background: #f1f9f4;
    `}

  @media (min-width: 1024px) and (min-height: 540px) {
    padding: 1.1vh 8px 0.9vh;

    h4 {
      margin-bottom: 0.4vh;
      font-size: clamp(17px, 2.6vh, 24px);
    }
    .money,
    .remain {
      font-size: clamp(13px, 1.9vh, 18px);
    }
  }
`;

export const SubmitMark = styled.span`
  display: inline-block;
  margin-left: 6px;
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--pine-500);
  color: #fff;
  font-family: "MaruBuri", serif;
  font-size: 12px;
  vertical-align: middle;
`;

export const SubmitSummary = styled.p`
  flex-basis: 100%;
  margin: 0;
  text-align: center;
  font-size: 16px;
  color: var(--pine-700);

  strong {
    color: var(--berry-600);
    font-size: 1.2em;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    flex-basis: auto;
    text-align: left;
    font-size: clamp(15px, 2.2vh, 20px);
  }
`;

/* =========================
   표
========================= */
export const ScrollHint = styled.p`
  display: none;
  margin-bottom: 6px;
  text-align: center;
  font-size: 12px;
  color: var(--ink-soft);

  @media (max-width: 1023px) {
    display: block;
  }
`;

// 좁은 화면에서는 표만 가로 스크롤 (페이지 전체가 밀리지 않도록)
export const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: #fff;

  @media (min-width: 1024px) and (min-height: 540px) {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    overflow: hidden;
  }
`;

export const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 64px repeat(12, 92px) 112px;
  gap: 6px;
  width: max-content;
  padding: 10px;

  @media (min-width: 1024px) {
    width: auto;
    grid-template-columns: 76px repeat(12, minmax(0, 1fr)) 110px;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    flex: 1;
    grid-template-rows: auto repeat(6, minmax(0, 1fr));
    padding: 1vh 10px;
    row-gap: 0.8vh;
  }
`;

export const Row = styled.div`
  display: contents;
`;

const stickyCol = css`
  position: sticky;
  left: 0;
  z-index: 2;
  /* 왼쪽 여백을 흰색으로 덮어 스크롤된 칸이 비치지 않게 */
  box-shadow: -10px 0 0 #fff, 6px 0 8px -6px rgba(58, 42, 30, 0.25);
`;

/* =========================
   헤더
========================= */
export const HeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 4px;
  border-radius: 10px;
  background: var(--pine-700);
  color: var(--gold-300);
  font-size: 15px;
  text-align: center;
  white-space: nowrap;

  ${({ $sticky }) => $sticky && stickyCol}

  @media (min-width: 1024px) and (min-height: 540px) {
    padding: 0.9vh 2px;
    font-size: clamp(14px, 2vh, 18px);
  }
`;

export const Rate = styled.span`
  margin-top: 4px;
  padding: 1px 8px;
  border-radius: 999px;
  background: #fff;
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

/* =========================
   팀
========================= */
export const TeamCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 46px;
  border-radius: 10px;
  background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
  color: #fff;

  ${({ $sticky }) => $sticky && stickyCol}

  @media (min-width: 1024px) and (min-height: 540px) {
    min-height: 0;
  }
`;

export const TeamnameCard = styled.div`
  font-size: 17px;
  white-space: nowrap;

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(15px, 2.3vh, 20px);
  }
`;

export const TotalCell = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  min-height: 46px;
  border-radius: 10px;
  background: #fbf1de;
  border: 1px solid var(--line);
  color: var(--ink);
  font-size: 17px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (min-width: 1024px) and (min-height: 540px) {
    min-height: 0;
    font-size: clamp(15px, 2.3vh, 20px);
  }
`;

/* =========================
   입력
========================= */
export const InputCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    min-width: 0;
    height: 38px;
    padding: 4px 8px;
    text-align: right;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: #fffdf8;
    /* 16px 미만이면 iOS에서 입력 시 화면이 확대됨 */
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    transition: border-color 0.15s, box-shadow 0.15s;

    @media (min-width: 1024px) {
      font-size: 14px;
    }
    @media (min-width: 1024px) and (min-height: 540px) {
      height: 100%;
      max-height: 52px;
      min-height: 26px;
      font-size: clamp(13px, 1.9vh, 18px);
    }
  }

  input:focus {
    outline: none;
    border-color: var(--gold-500);
    box-shadow: 0 0 0 3px rgba(217, 168, 78, 0.3);
  }

  input:disabled {
    background: #f4ece0;
    color: var(--ink-soft);
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    align-items: stretch;
    min-height: 0;
  }
`;

/* =========================
   버튼
========================= */
export const ProfitButton = styled.button`
  display: block;
  width: 100%;
  max-width: 360px;
  margin: 18px auto 0;
  padding: 14px 34px;

  border-radius: 999px;
  border: 2px solid var(--gold-300);
  background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
  color: #fff;
  font-size: 18px;
  box-shadow: 0 10px 22px rgba(142, 27, 36, 0.32);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 26px rgba(142, 27, 36, 0.42);
  }
  &:focus-visible {
    outline: 3px solid var(--gold-500);
    outline-offset: 3px;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    flex: none;
    margin-top: 1.6vh;
    padding: 1.4vh 34px;
  }
`;

/* =========================
   최종 순위
========================= */
export const RankingWrap = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 8px 0 12px;
  text-align: center;

  @media (min-width: 1024px) and (min-height: 540px) {
    margin: auto;
  }
`;

export const RankingTitle = styled.h1`
  font-family: "경기천년바탕_Regular", serif;
  font-size: clamp(28px, 6vw, 40px);
  color: var(--berry-700);
`;

export const RankingSub = styled.p`
  margin: 8px 0 24px;
  font-size: clamp(14px, 3vw, 17px);
  color: var(--pine-700);
`;

export const RankingList = styled.ol`
  display: grid;
  gap: 10px;

  @media (min-width: 1024px) and (min-height: 540px) {
    gap: 1vh;
  }
`;

const placeStyles = [
  css`
    background: linear-gradient(180deg, #fff4d6, #f6dc9b);
    border-color: var(--gold-500);
    box-shadow: 0 8px 20px rgba(217, 168, 78, 0.35);
  `,
  css`
    background: linear-gradient(180deg, #ffffff, #eef1f0);
  `,
  css`
    background: linear-gradient(180deg, #fff6ef, #f3dcc8);
  `,
];

export const RankingRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: clamp(14px, 3vw, 18px) clamp(14px, 4vw, 28px);
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;

  ${({ $place }) => placeStyles[$place]}

  @media (min-width: 1024px) and (min-height: 540px) {
    padding: 1.4vh 28px;
  }
`;

export const RankingName = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(17px, 3.6vw, 21px);
  color: var(--ink);
  white-space: nowrap;
`;

export const Medal = styled.span`
  font-size: 1.3em;
`;

export const RankingMoney = styled.span`
  font-size: clamp(16px, 3.4vw, 21px);
  color: var(--pine-800);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

/* =========================
   진행자 도구 (연결 상태 · QR · 새 게임)
========================= */
export const HostBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;

  @media (min-width: 1024px) and (min-height: 540px) {
    margin-bottom: 1vh;
  }
`;

export const ConnBadge = styled.span`
  font-size: 13px;
  color: ${({ $ok }) => ($ok ? "var(--pine-500)" : "var(--berry-600)")};
`;

export const HostButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const SmallButton = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--pine-700);
  font-size: 14px;

  &:hover {
    border-color: var(--gold-500);
  }
`;

export const Loading = styled.p`
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  color: var(--ink-soft);
`;

/* =========================
   라운드 + 소식 한 줄 (큰 화면)
========================= */
export const TopRow = styled.div`
  @media (min-width: 1024px) and (min-height: 540px) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: stretch;
    gap: 20px;
    margin-bottom: 1.4vh;
  }
`;
