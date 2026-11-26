import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";
import { teams } from "../data/game";
import { isFirebaseMode } from "../sync/gameStore";

// ==========================
// 팀 입력 QR 안내 창
// ==========================
const QrModal = ({ onClose }) => {
  const url = `${window.location.origin}/team`;
  const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-label="팀 입력 QR코드">
        <ModalTitle>📱 휴대폰으로 투자하기</ModalTitle>
        <QrBox>
          <QRCodeSVG value={url} size={240} marginSize={2} />
        </QrBox>
        <QrUrl>{url}</QrUrl>
        <ModalText>카메라로 QR코드를 찍고 우리 팀을 고르세요.</ModalText>
        {!isFirebaseMode && (
          <ModalWarn>
            ⚠️ 지금은 Firebase 설정 전이라 <b>이 컴퓨터의 다른 탭에서만</b> 연동돼요.
            휴대폰과 연동하려면 src/gameConfig.js 를 채워 주세요.
          </ModalWarn>
        )}
        {isFirebaseMode && isLocalhost && (
          <ModalWarn>
            ⚠️ 지금 주소가 localhost 라서 휴대폰에서는 열리지 않아요.
            배포된 주소(예: Netlify)에서 이 창을 열어 주세요.
          </ModalWarn>
        )}
        <ModalTeamLinks>
          {teams.map((t) => (
            <a key={t} href={`/team/${t}`} target="_blank" rel="noreferrer">
              {t}팀 화면
            </a>
          ))}
        </ModalTeamLinks>
        <ModalClose type="button" onClick={onClose}>닫기</ModalClose>
      </ModalCard>
    </ModalBackdrop>
  );
};

export default QrModal;

/* =========================
   QR 안내 창
========================= */
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(11, 35, 29, 0.7);
`;

const ModalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 420px;
  max-height: 100%;
  overflow-y: auto;
  padding: 24px 20px 20px;
  border-radius: 22px;
  background: var(--ivory);
  border: 2px solid var(--gold-300);
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-family: "경기천년바탕_Regular", serif;
  font-size: 24px;
  color: var(--pine-800);
`;

const QrBox = styled.div`
  padding: 8px;
  border-radius: 12px;
  background: #fff;
  line-height: 0;
`;

const QrUrl = styled.p`
  font-size: 16px;
  color: var(--berry-700);
  word-break: break-all;
`;

const ModalText = styled.p`
  font-size: 15px;
  color: var(--ink-soft);
`;

const ModalWarn = styled.p`
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff4d6;
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink);
  text-align: left;
  word-break: keep-all;
`;

const ModalTeamLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;

  a {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: #fff;
    color: var(--pine-700);
    font-size: 13px;
    text-decoration: none;
  }
`;

const ModalClose = styled.button`
  margin-top: 4px;
  padding: 10px 40px;
  border-radius: 999px;
  border: 2px solid var(--gold-300);
  background: linear-gradient(180deg, var(--berry-500), var(--berry-700));
  color: #fff;
  font-size: 16px;
`;
