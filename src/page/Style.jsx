import styled, { css } from "styled-components";

const baubleColors = ["#b3262e", "#d9a84e", "#2f7a5f", "#d23c40", "#c9933a", "#1a4a3b"];

/* =========================
   전체 컨테이너
========================= */
export const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(20px, 5vw, 48px) 16px;
  padding-bottom: max(clamp(20px, 5vw, 48px), env(safe-area-inset-bottom));

  @media (min-width: 1024px) and (min-height: 540px) {
    align-items: center;
    padding: 2vh 24px;
  }
`;

/* =========================
   카드 레이아웃
========================= */
export const Card = styled.main`
  position: relative;
  width: 100%;
  max-width: 860px;
  padding: clamp(28px, 5vw, 44px) clamp(16px, 4vw, 40px) clamp(20px, 4vw, 32px);
  overflow: hidden;
  text-align: center;

  border-radius: 28px;
  background: var(--ivory);
  border: 2px solid var(--gold-300);
  box-shadow:
    0 0 0 6px rgba(217, 168, 78, 0.18),
    0 30px 60px rgba(0, 0, 0, 0.35);

  @media (min-width: 1024px) and (min-height: 540px) {
    max-width: clamp(1120px, 135vh, 1500px);
    padding: 3.2vh 32px 2.4vh;
  }
`;

// 카드 상단 리본 줄무늬 (캔디케인)
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
   제목
========================= */
export const Header = styled.header`
  margin-bottom: clamp(20px, 4vw, 28px);

  @media (min-width: 1024px) and (min-height: 540px) {
    margin-bottom: 2vh;
  }
`;

export const Eyebrow = styled.p`
  font-size: 13px;
  letter-spacing: 0.3em;
  color: var(--gold-500);
  text-transform: uppercase;
  margin-bottom: 10px;

  @media (min-width: 1024px) and (min-height: 540px) {
    margin-bottom: 0.6vh;
  }
`;

export const Title = styled.h1`
  font-family: "경기천년바탕_Regular", serif;
  font-size: clamp(30px, 7vw, 46px);
  line-height: 1.15;
  color: var(--berry-700);
  word-break: keep-all;

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(32px, 5.4vh, 54px);
  }
`;

export const TitleSub = styled.span`
  display: block;
  margin-top: 6px;
  font-size: clamp(18px, 4vw, 24px);
  color: var(--pine-700);

  @media (min-width: 1024px) and (min-height: 540px) {
    margin-top: 0.4vh;
    font-size: clamp(18px, 2.8vh, 28px);
  }
`;

export const SubTitle = styled.p`
  display: inline-block;
  margin-top: 16px;
  padding: 6px 18px;
  border-radius: 999px;
  background: rgba(26, 74, 59, 0.08);
  color: var(--pine-700);
  font-size: clamp(14px, 3.4vw, 17px);

  @media (min-width: 1024px) and (min-height: 540px) {
    margin-top: 1.2vh;
    padding: 4px 18px;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(14px, 2vh, 21px);
  }
`;

/* =========================
   섹션 공통
========================= */
export const Section = styled.section`
  margin-top: 14px;
  padding: clamp(14px, 3vw, 20px);
  text-align: left;
  border-radius: 20px;
  background: #fff;
  border: 1px solid var(--line);

  @media (min-width: 1024px) and (min-height: 540px) {
    margin-top: 0;
    padding: 1.8vh 20px;
  }
`;

export const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media (min-width: 1024px) and (min-height: 540px) {
    margin-bottom: 1.2vh;
  }
`;

export const SectionTitle = styled.h2`
  font-family: "경기천년바탕_Regular", serif;
  font-size: clamp(17px, 3.6vw, 20px);
  color: var(--pine-800);

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(17px, 2.5vh, 26px);
  }
`;

export const Badge = styled.span`
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--pine-700);
  color: var(--gold-300);
  font-size: 13px;
  font-variant-numeric: tabular-nums;

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(13px, 1.7vh, 18px);
  }
`;

/* =========================
   팀
========================= */
export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

export const Team = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 6px 8px;

  border-radius: 14px;
  background: linear-gradient(180deg, #fffdf8, #fbf1de);
  border: 1px solid var(--line);
  color: var(--ink);
  font-size: 15px;
  white-space: nowrap;

  @media (min-width: 1024px) and (min-height: 540px) {
    min-height: clamp(36px, 5.4vh, 64px);
    gap: 6px;
    padding: 4px;
    font-size: clamp(14px, 1.9vh, 20px);
  }
`;

export const Bauble = styled.span`
  flex: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $index }) => baubleColors[($index - 1) % baubleColors.length]};
  box-shadow: inset -2px -2px 0 rgba(0, 0, 0, 0.18), inset 2px 2px 0 rgba(255, 255, 255, 0.4);
`;

/* =========================
   게임 설명
========================= */
export const RuleList = styled.ul`
  display: grid;
  gap: 6px;

  @media (min-width: 1024px) and (min-height: 540px) {
    gap: 0;
  }
`;

export const Rule = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 10px 2px;
  border-bottom: 1px dashed var(--line);

  &:last-child {
    border-bottom: 0;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    padding: 1.3vh 2px;
  }
`;

export const RuleKey = styled.span`
  flex: none;
  color: var(--ink-soft);
  font-size: 15px;

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(15px, 2.1vh, 22px);
  }
`;

export const RuleValue = styled.span`
  color: var(--ink);
  font-size: 15px;
  text-align: right;
  word-break: keep-all;

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(15px, 2.1vh, 22px);
  }
`;

/* =========================
   감정 카드
========================= */
export const EmotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }
  @media (min-width: 820px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 8px;
  }
`;

export const Emotion = styled.div`
  padding: 10px 4px;
  text-align: center;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;

  ${({ $tone }) =>
    $tone === "red"
      ? css`
          background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
          box-shadow: 0 4px 10px rgba(142, 27, 36, 0.25);
        `
      : css`
          background: linear-gradient(180deg, var(--pine-500), var(--pine-700));
          box-shadow: 0 4px 10px rgba(26, 74, 59, 0.25);
        `}

  @media (min-width: 1024px) and (min-height: 540px) {
    padding: 1.4vh 4px;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    font-size: clamp(16px, 2.3vh, 24px);
  }
`;

/* =========================
   시작 버튼
========================= */
export const StartButton = styled.button`
  display: block;
  width: 100%;
  max-width: 420px;
  margin: clamp(20px, 4vw, 28px) auto 0;
  padding: 16px 24px;

  border-radius: 999px;
  background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
  border: 2px solid var(--gold-300);
  color: #fff;
  font-size: 18px;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 24px rgba(142, 27, 36, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(142, 27, 36, 0.45);
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 3px solid var(--gold-500);
    outline-offset: 3px;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    margin: 0;
    padding: 1.8vh 24px;
    font-size: clamp(17px, 2.3vh, 24px);
  }
`;

/* =========================
   팀 입력 QR 버튼
========================= */
export const QrButton = styled.button`
  display: block;
  width: 100%;
  max-width: 420px;
  margin: 12px auto 0;
  padding: 14px 24px;

  border-radius: 999px;
  background: #fff;
  border: 2px solid var(--pine-500);
  color: var(--pine-700);
  font-size: 17px;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(47, 122, 95, 0.08);
  }
  &:focus-visible {
    outline: 3px solid var(--gold-500);
    outline-offset: 3px;
  }

  @media (min-width: 1024px) and (min-height: 540px) {
    margin: 0;
    padding: 1.8vh 24px;
    font-size: clamp(17px, 2.3vh, 24px);
  }
`;

/* =========================
   큰 화면: 한 화면에 다 보이게 배치
========================= */
export const Body = styled.div`
  @media (min-width: 1024px) and (min-height: 540px) {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 14px;
    align-items: stretch;
  }
`;

export const Column = styled.div`
  @media (min-width: 1024px) and (min-height: 540px) {
    display: flex;
    flex-direction: column;
    gap: 14px;

    & > section:last-child {
      flex: 1;
    }
  }
`;

export const ButtonRow = styled.div`
  @media (min-width: 1024px) and (min-height: 540px) {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 2.4vh;

    & > button {
      flex: 1;
      max-width: clamp(320px, 40vh, 460px);
    }
  }
`;
