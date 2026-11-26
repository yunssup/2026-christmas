import React, { useState } from "react";
import * as S from "../gamestart/Style";
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
import {
  emotionRatesByRound,
  getEmotionRateLabel,
  getEmotionRateColor
} from "../../data/rates";
import { useGame, updateGame, resetGame, isFirebaseMode } from "../../sync/gameStore";
import QrModal from "../../components/QrModal";

// ==========================
// 컴포넌트
// ==========================

const Gamestart = () => {
  const { ready, game, connected } = useGame();
  const [showQr, setShowQr] = useState(false);

  const { round, showResult, gameEnd, balances, profits, inv } = game;
  const roundInv = inv[roundKey(round)] || {};

  const getAmounts = (team) => roundInv[teamKey(team)]?.amounts || {};
  const isSubmitted = (team) => Boolean(roundInv[teamKey(team)]?.submitted);
  const getTeamTotal = (team) => sumAmounts(getAmounts(team));
  const getRemainingBalance = (team) => balances[teamKey(team)] - getTeamTotal(team);

  // 진행자가 큰 화면에서 직접 고칠 때 (예비 수단)
  const handleChange = (team, emotion, value) => {
    const amount = parseAmount(value);
    if (amount === null) return;
    const amounts = getAmounts(team);
    const totalExceptThis = getTeamTotal(team) - Number(amounts[emotion] || 0);
    if (totalExceptThis + amount > balances[teamKey(team)]) return;
    updateGame({
      [`inv/${roundKey(round)}/${teamKey(team)}/amounts/${emotion}`]: amount || null
    });
  };

  const calcProfit = (team) => {
    const rates = emotionRatesByRound[round] || {};
    const amounts = getAmounts(team);
    const returned = Object.entries(amounts).reduce(
      (sum, [emotion, value]) => sum + Number(value || 0) * (rates[emotion] ?? 1),
      0
    );
    return Math.floor(returned - sumAmounts(amounts));
  };

  const handleResult = () => {
    if (showResult) return;

    const notSubmitted = teams.filter((t) => !isSubmitted(t));
    if (
      notSubmitted.length > 0 &&
      !window.confirm(
        `아직 제출하지 않은 팀: ${notSubmitted.map((t) => `${t}팀`).join(", ")}\n지금 입력된 금액으로 정산할까요?`
      )
    ) {
      return;
    }

    const paths = { "state/showResult": true };
    teams.forEach((team) => {
      const key = teamKey(team);
      const profit = calcProfit(team);
      paths[`state/balances/${key}`] = balances[key] + profit;
      paths[`state/profits/${key}`] = profit;
    });
    updateGame(paths);
  };

  const nextRound = () => {
    // 10라운드 정산 후 이 버튼을 누르면 최종 순위 화면으로 전환
    if (round === TOTAL_ROUNDS) {
      updateGame({ "state/gameEnd": true });
      return;
    }
    updateGame({
      "state/round": round + 1,
      "state/showResult": false,
      "state/profits": null
    });
  };

  const handleReset = () => {
    if (
      window.confirm(
        "새 게임을 시작할까요?\n모든 팀의 자산과 입력 기록이 지워지고 1라운드부터 다시 시작해요."
      )
    ) {
      resetGame();
    }
  };

  const ranking = teams
    .map((team) => ({
      team,
      money: balances[teamKey(team)],
    }))
    .sort((a, b) => b.money - a.money);

  const submittedCount = teams.filter(isSubmitted).length;

  return (
    <S.Container>
      <S.Card2>
        <S.Ribbon aria-hidden="true" />

        <S.HostBar>
          <S.ConnBadge $ok={connected}>
            {isFirebaseMode
              ? connected ? "● 실시간 연결됨" : "● 연결 끊김 (다시 연결 중…)"
              : "● 혼자 테스트 모드 (Firebase 미설정)"}
          </S.ConnBadge>
          <S.HostButtons>
            <S.SmallButton type="button" onClick={() => setShowQr(true)}>
              📱 팀 입력 QR
            </S.SmallButton>
            <S.SmallButton type="button" onClick={handleReset}>
              🔄 새 게임
            </S.SmallButton>
          </S.HostButtons>
        </S.HostBar>

        {!ready ? (
          <S.Loading>게임 정보를 불러오는 중… 🎄</S.Loading>
        ) : gameEnd ? (
          <S.RankingWrap>
            <S.RankingTitle>🏆 최종 순위</S.RankingTitle>
            <S.RankingSub>메리 크리스마스! 올해의 신내동 투자왕은?</S.RankingSub>

            <S.RankingList>
              {ranking.map((item, index) => (
                <S.RankingRow key={item.team} $place={index}>
                  <S.RankingName>
                    <S.Medal aria-hidden="true">
                      {["🥇", "🥈", "🥉"][index] ?? "🎁"}
                    </S.Medal>
                    {index + 1}등 · {item.team}팀
                  </S.RankingName>
                  <S.RankingMoney>{formatNumber(item.money)}원</S.RankingMoney>
                </S.RankingRow>
              ))}
            </S.RankingList>
          </S.RankingWrap>
        ) : (
          <>
            <S.TopRow>
              <S.RoundHeader>
                <S.RoundTitle>
                  ROUND <strong>{round}</strong>
                  <small>/ {TOTAL_ROUNDS}</small>
                </S.RoundTitle>
                <S.RoundDots aria-label={`${TOTAL_ROUNDS}라운드 중 ${round}라운드`}>
                  {Array.from({ length: TOTAL_ROUNDS }, (_, i) => (
                    <S.RoundDot key={i} $state={i + 1 < round ? "done" : i + 1 === round ? "now" : "todo"} />
                  ))}
                </S.RoundDots>
                {!showResult && (
                  <S.SubmitSummary>
                    🎅 제출 완료 <strong>{submittedCount}</strong> / {teams.length}팀
                  </S.SubmitSummary>
                )}
              </S.RoundHeader>

              <S.newscards>
                <S.NewsLabel>📜 오늘의 소식</S.NewsLabel>
                {newsByRound[round]}
              </S.newscards>
            </S.TopRow>

            <S.TeamStatusWrap>
              {teams.map((team) => {
                const profit = profits[teamKey(team)] ?? 0;
                return (
                  <S.TeamStatusCard key={team} $submitted={!showResult && isSubmitted(team)}>
                    <h4>
                      {team}팀
                      {!showResult && isSubmitted(team) && <S.SubmitMark>✅ 제출</S.SubmitMark>}
                    </h4>
                    <div className="money">
                      보유 {formatNumber(balances[teamKey(team)])}원
                    </div>
                    {showResult ? (
                      <div className={`remain ${profit >= 0 ? "up" : "down"}`}>
                        수익 {profit >= 0 ? "+" : ""}
                        {formatNumber(profit)}원
                      </div>
                    ) : (
                      <div className="remain">
                        가능 {formatNumber(getRemainingBalance(team))}원
                      </div>
                    )}
                  </S.TeamStatusCard>
                );
              })}
            </S.TeamStatusWrap>

            <S.ScrollHint>← 표를 좌우로 밀어서 확인하세요 →</S.ScrollHint>
            <S.TableScroll>
              <S.TableGrid>
                <S.HeaderCell $sticky>팀</S.HeaderCell>

                {emotions.map((emotion) => (
                  <S.HeaderCell key={emotion}>
                    {emotion}
                    {showResult && (
                      <S.Rate style={{ color: getEmotionRateColor(emotion, round) }}>
                        {getEmotionRateLabel(emotion, round)}
                      </S.Rate>
                    )}
                  </S.HeaderCell>
                ))}

                <S.HeaderCell>합계</S.HeaderCell>

                {teams.map((team) => (
                  <S.Row key={team}>
                    <S.TeamCell $sticky>
                      <S.TeamnameCard>
                        {team}팀{!showResult && isSubmitted(team) ? " ✅" : ""}
                      </S.TeamnameCard>
                    </S.TeamCell>

                    {emotions.map((emotion) => (
                      <S.InputCell key={emotion}>
                        <input
                          inputMode="numeric"
                          aria-label={`${team}팀 ${emotion} 투자액`}
                          disabled={showResult}
                          value={formatNumber(getAmounts(team)[emotion] || "")}
                          onChange={(e) =>
                            handleChange(team, emotion, e.target.value)
                          }
                        />
                      </S.InputCell>
                    ))}

                    <S.TotalCell>{formatNumber(getTeamTotal(team))}</S.TotalCell>
                  </S.Row>
                ))}
              </S.TableGrid>
            </S.TableScroll>

            {/* 10라운드 수익률 확인 시 버튼 텍스트가 '최종 결과 보기'로 바뀝니다. */}
            <S.ProfitButton type="button" onClick={showResult ? nextRound : handleResult}>
              {showResult
                ? round === TOTAL_ROUNDS
                  ? "🏆 최종 결과 보기"
                  : "🎄 다음 라운드"
                : "🔔 수익률 확인"}
            </S.ProfitButton>
          </>
        )}
      </S.Card2>

      {showQr && <QrModal onClose={() => setShowQr(false)} />}
    </S.Container>
  );
};

export default Gamestart;
