import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as S from "./Style";
import {
  emotions,
  teams,
  newsByRound,
  formatNumber,
  parseAmount,
  teamKey,
  roundKey,
  sumAmounts,
  TOTAL_ROUNDS
} from "../../data/game";
import { useGame, updateGame } from "../../sync/gameStore";
import { TEAM_PINS } from "../../gameConfig";

// ==========================
// 팀 비밀번호 (선택)
// ==========================
const pinStorageKey = (team) => `christmas-team-pin:${team}`;

const hasValidPin = (team) => {
  if (!TEAM_PINS) return true;
  try {
    return localStorage.getItem(pinStorageKey(team)) === String(TEAM_PINS[team]);
  } catch {
    return false;
  }
};

const PinGate = ({ team, onPass }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pin === String(TEAM_PINS[team])) {
      try {
        localStorage.setItem(pinStorageKey(team), pin);
      } catch {
        // 저장 못 해도 이번엔 통과
      }
      onPass();
    } else {
      setError(true);
    }
  };

  return (
    <S.Center as="form" onSubmit={submit}>
      <S.BigTitle>🔒 {team}팀 비밀번호</S.BigTitle>
      <S.Muted>선생님께 받은 비밀번호를 입력하세요.</S.Muted>
      <S.PinInput
        inputMode="numeric"
        autoFocus
        value={pin}
        onChange={(e) => {
          setPin(e.target.value.replace(/\D/g, ""));
          setError(false);
        }}
        aria-label="팀 비밀번호"
      />
      {error && <S.ErrorText>비밀번호가 달라요. 다시 확인해 주세요.</S.ErrorText>}
      <S.PrimaryButton type="submit">들어가기</S.PrimaryButton>
      <S.BackLink as={Link} to="/team">← 팀 다시 고르기</S.BackLink>
    </S.Center>
  );
};

// ==========================
// 팀 고르기
// ==========================
const TeamPicker = () => {
  const navigate = useNavigate();
  return (
    <S.Center>
      <S.Eyebrow>✦ 신(내)의 한수 ✦</S.Eyebrow>
      <S.BigTitle>우리 팀을 골라 주세요</S.BigTitle>
      <S.PickGrid>
        {teams.map((t) => (
          <S.PickButton key={t} type="button" onClick={() => navigate(`/team/${t}`)}>
            🎁 {t}팀
          </S.PickButton>
        ))}
      </S.PickGrid>
    </S.Center>
  );
};

// ==========================
// 팀 입력 화면
// ==========================
const TeamInput = ({ team }) => {
  const { ready, game, connected } = useGame();
  const [pinOk, setPinOk] = useState(() => hasValidPin(team));

  const { round, showResult, gameEnd, balances, profits, inv } = game;
  const key = teamKey(team);
  const myEntry = inv[roundKey(round)]?.[key] || {};
  const amounts = myEntry.amounts || {};
  const submitted = Boolean(myEntry.submitted);
  const balance = balances[key];
  const total = sumAmounts(amounts);
  const remaining = balance - total;
  const locked = showResult || submitted;

  const ranking = useMemo(
    () =>
      teams
        .map((t) => ({ team: t, money: balances[teamKey(t)] }))
        .sort((a, b) => b.money - a.money),
    [balances]
  );

  if (!pinOk) return <PinGate team={team} onPass={() => setPinOk(true)} />;

  if (!ready) {
    return (
      <S.Center>
        <S.Muted>게임 정보를 불러오는 중… 🎄</S.Muted>
      </S.Center>
    );
  }

  const base = `inv/${roundKey(round)}/${key}`;

  const handleChange = (emotion, value) => {
    if (locked) return;
    const amount = parseAmount(value);
    if (amount === null) return;
    const totalExceptThis = total - Number(amounts[emotion] || 0);
    if (totalExceptThis + amount > balance) return;
    updateGame({ [`${base}/amounts/${emotion}`]: amount || null });
  };

  const setSubmitted = (value) => updateGame({ [`${base}/submitted`]: value || null });

  // ---------- 최종 결과 ----------
  if (gameEnd) {
    const place = ranking.findIndex((r) => r.team === team);
    return (
      <S.Center>
        <S.BigTitle>🏆 게임 끝!</S.BigTitle>
        <S.ResultBox>
          <div className="label">{team}팀 최종 자산</div>
          <div className="big">{formatNumber(balance)}원</div>
          <div className="place">
            {["🥇", "🥈", "🥉"][place] ?? "🎁"} {place + 1}등
          </div>
        </S.ResultBox>
        <S.Muted>메리 크리스마스! 큰 화면에서 순위를 확인하세요 🎅</S.Muted>
      </S.Center>
    );
  }

  const profit = profits[key];

  return (
    <S.Page>
      <S.TopBar>
        <S.TeamBadge>🎁 {team}팀</S.TeamBadge>
        <S.RoundText>
          ROUND <strong>{round}</strong> / {TOTAL_ROUNDS}
        </S.RoundText>
        <S.Conn $ok={connected}>{connected ? "● 연결됨" : "● 연결 끊김"}</S.Conn>
      </S.TopBar>

      <S.News>
        <span>📜 오늘의 소식</span>
        {newsByRound[round]}
      </S.News>

      <S.MoneyRow>
        <div>
          <span>보유 자산</span>
          <strong>{formatNumber(balance)}원</strong>
        </div>
        <div>
          <span>남은 금액</span>
          <strong className={remaining === 0 ? "zero" : ""}>
            {formatNumber(remaining)}원
          </strong>
        </div>
      </S.MoneyRow>

      {showResult ? (
        <S.Notice $tone={profit >= 0 ? "up" : "down"}>
          🔔 수익률 발표!
          <strong>
            이번 라운드 수익 {profit >= 0 ? "+" : ""}
            {formatNumber(profit ?? 0)}원
          </strong>
          <small>큰 화면을 보세요. 다음 라운드가 시작되면 자동으로 바뀌어요.</small>
        </S.Notice>
      ) : submitted ? (
        <S.Notice $tone="ok">
          ✅ 제출 완료!
          <small>수정하려면 아래 ‘다시 수정하기’를 누르세요.</small>
        </S.Notice>
      ) : null}

      <S.EmotionList>
        {emotions.map((emotion) => (
          <S.EmotionRow key={emotion} $filled={Number(amounts[emotion] || 0) > 0}>
            <label htmlFor={`amt-${emotion}`}>{emotion}</label>
            <input
              id={`amt-${emotion}`}
              inputMode="numeric"
              placeholder="0"
              disabled={locked}
              value={formatNumber(amounts[emotion] || "")}
              onChange={(e) => handleChange(emotion, e.target.value)}
            />
            <em>원</em>
          </S.EmotionRow>
        ))}
      </S.EmotionList>

      <S.Footer>
        <div className="sum">
          투자 합계 <strong>{formatNumber(total)}원</strong>
        </div>
        {!showResult &&
          (submitted ? (
            <S.SecondaryButton type="button" onClick={() => setSubmitted(false)}>
              ✏️ 다시 수정하기
            </S.SecondaryButton>
          ) : (
            <S.PrimaryButton
              type="button"
              onClick={() => {
                if (total === 0 && !window.confirm("투자 금액이 0원이에요. 이대로 제출할까요?")) return;
                setSubmitted(true);
              }}
            >
              🎅 제출하기
            </S.PrimaryButton>
          ))}
      </S.Footer>
    </S.Page>
  );
};

// ==========================
// 라우트 진입점
// ==========================
const Team = () => {
  const { teamId } = useParams();
  const team = Number(teamId);

  return (
    <S.Container>
      <S.Card>
        <S.Ribbon aria-hidden="true" />
        {teams.includes(team) ? (
          <TeamInput key={team} team={team} />
        ) : (
          <TeamPicker />
        )}
      </S.Card>
    </S.Container>
  );
};

export default Team;
