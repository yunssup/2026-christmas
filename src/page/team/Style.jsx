import styled, { css } from "styled-components";

/* =========================
   틀 (휴대폰 화면 기준)
========================= */
export const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 12px 10px max(12px, env(safe-area-inset-bottom));
`;

export const Card = styled.main`
  position: relative;
  width: 100%;
  max-width: 520px;
  min-width: 0;
  overflow: hidden;
  padding: 26px 16px 16px;
  border-radius: 22px;
  background: var(--ivory);
  border: 2px solid var(--gold-300);
  box-shadow:
    0 0 0 5px rgba(217, 168, 78, 0.18),
    0 24px 50px rgba(0, 0, 0, 0.35);
`;

export const Ribbon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 9px;
  background: repeating-linear-gradient(
    -45deg,
    var(--berry-600) 0 12px,
    var(--snow) 12px 24px
  );
`;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 18px 4px 8px;
  text-align: center;
`;

/* =========================
   글자
========================= */
export const Eyebrow = styled.p`
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--gold-500);
`;

export const BigTitle = styled.h1`
  font-family: "경기천년바탕_Regular", serif;
  font-size: 26px;
  color: var(--pine-800);
`;

export const Muted = styled.p`
  font-size: 15px;
  color: var(--ink-soft);
  word-break: keep-all;
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: var(--berry-600);
`;

/* =========================
   팀 고르기 · 비밀번호
========================= */
export const PickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
`;

export const PickButton = styled.button`
  padding: 20px 8px;
  border-radius: 16px;
  border: 2px solid var(--gold-300);
  background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
  color: #fff;
  font-size: 20px;
  box-shadow: 0 8px 16px rgba(142, 27, 36, 0.25);

  &:active {
    transform: translateY(1px);
  }
`;

export const PinInput = styled.input`
  width: 180px;
  height: 54px;
  text-align: center;
  letter-spacing: 0.3em;
  border-radius: 12px;
  border: 2px solid var(--line);
  background: #fff;
  font-size: 26px;

  &:focus {
    outline: none;
    border-color: var(--gold-500);
  }
`;

export const BackLink = styled.a`
  font-size: 14px;
  color: var(--ink-soft);
  text-decoration: underline;
`;

/* =========================
   상단
========================= */
export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TeamBadge = styled.span`
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
  color: #fff;
  font-size: 17px;
  white-space: nowrap;
`;

export const RoundText = styled.span`
  font-family: "경기천년바탕_Regular", serif;
  font-size: 15px;
  color: var(--pine-800);
  white-space: nowrap;

  strong {
    color: var(--berry-600);
    font-size: 1.3em;
  }
`;

export const Conn = styled.span`
  font-size: 12px;
  white-space: nowrap;
  color: ${({ $ok }) => ($ok ? "var(--pine-500)" : "var(--berry-600)")};
`;

export const News = styled.div`
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid var(--line);
  border-left: 5px solid var(--berry-600);
  font-size: 16px;
  line-height: 1.5;
  word-break: keep-all;

  span {
    display: block;
    margin-bottom: 2px;
    font-size: 12px;
    letter-spacing: 0.08em;
    color: var(--gold-500);
  }
`;

export const MoneyRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  div {
    padding: 10px 12px;
    border-radius: 14px;
    background: #fff;
    border: 1px solid var(--line);
    text-align: center;
  }
  span {
    display: block;
    font-size: 12px;
    color: var(--ink-soft);
  }
  strong {
    font-size: 18px;
    color: var(--pine-800);
    font-variant-numeric: tabular-nums;
  }
  strong.zero {
    color: var(--berry-600);
  }
`;

const noticeTones = {
  ok: css`
    background: #e8f4ee;
    border-color: var(--pine-500);
    color: var(--pine-800);
  `,
  up: css`
    background: #fdecec;
    border-color: #c62828;
    color: #c62828;
  `,
  down: css`
    background: #eaf1fb;
    border-color: #1e63b5;
    color: #1e63b5;
  `
};

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 2px solid;
  text-align: center;
  font-size: 17px;

  strong {
    font-size: 20px;
    font-variant-numeric: tabular-nums;
  }
  small {
    font-size: 13px;
    color: var(--ink-soft);
    word-break: keep-all;
  }

  ${({ $tone }) => noticeTones[$tone]}
`;

/* =========================
   감정 입력
========================= */
export const EmotionList = styled.div`
  display: grid;
  gap: 6px;
`;

export const EmotionRow = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr 22px;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--line);

  ${({ $filled }) =>
    $filled &&
    css`
      border-color: var(--gold-500);
      background: #fffaf0;
    `}

  label {
    font-size: 17px;
    color: var(--pine-800);
  }

  input {
    width: 100%;
    min-width: 0;
    height: 42px;
    padding: 4px 10px;
    text-align: right;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: #fffdf8;
    /* 16px 미만이면 iOS에서 화면이 확대됨 */
    font-size: 18px;
    font-variant-numeric: tabular-nums;
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

  em {
    font-style: normal;
    font-size: 14px;
    color: var(--ink-soft);
  }
`;

/* =========================
   하단 (스크롤해도 따라옴)
========================= */
export const Footer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px -16px -16px;
  padding: 12px 16px max(14px, env(safe-area-inset-bottom));
  background: var(--ivory);
  border-top: 1px solid var(--line);
  box-shadow: 0 -8px 16px rgba(58, 42, 30, 0.08);

  .sum {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: var(--ink-soft);
  }
  .sum strong {
    font-size: 18px;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
  }
`;

const buttonBase = css`
  width: 100%;
  padding: 14px 20px;
  border-radius: 999px;
  font-size: 18px;
`;

export const PrimaryButton = styled.button`
  ${buttonBase}
  max-width: 360px;
  align-self: center;
  border: 2px solid var(--gold-300);
  background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
  color: #fff;
  box-shadow: 0 8px 18px rgba(142, 27, 36, 0.3);
`;

export const SecondaryButton = styled.button`
  ${buttonBase}
  border: 2px solid var(--pine-500);
  background: #fff;
  color: var(--pine-700);
`;

/* =========================
   최종 결과
========================= */
export const ResultBox = styled.div`
  width: 100%;
  padding: 20px 16px;
  border-radius: 18px;
  border: 2px solid var(--gold-500);
  background: linear-gradient(180deg, #fff4d6, #f6dc9b);

  .label {
    font-size: 15px;
    color: var(--ink-soft);
  }
  .big {
    margin: 6px 0;
    font-size: 30px;
    color: var(--pine-800);
    font-variant-numeric: tabular-nums;
  }
  .place {
    font-size: 22px;
    color: var(--berry-700);
  }
`;
