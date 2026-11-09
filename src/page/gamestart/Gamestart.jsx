import React, { useState } from "react";
import * as S from "../gamestart/Style";

// ==========================
// 기본 데이터
// ==========================

const emotions = [
  "탐욕", "사랑", "질투", "믿음",
  "분노", "용기", "나태", "희망",
  "슬픔", "절제", "두려움", "화합"
];

const teams = [1, 2, 3, 4, 5, 6];

// 숫자 포맷
const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value);
  if (isNaN(num)) return "";
  return num.toLocaleString();
};

// ==========================
// 라운드별 감정 수익률
// ==========================

const emotionRatesByRound = {
  1: { // 아기돼지 삼형제
    두려움: 1.35, 절제: 1.30, 화합: 1.25, 용기: 1.15, 사랑: 1.10,
    나태: 0.70, 탐욕: 0.85, 분노: 0.90,
    질투: 1, 믿음: 1, 희망: 1, 슬픔: 1
  },
  2: { // 모세와 홍해
    두려움: 1.70, 질투: 1,  분노: 0.60, 탐욕: 1, 슬픔: 0.80,
    화합: 1.10, 사랑: 1, 절제: 1, 믿음: 1.45,
    희망: 1.25, 용기: 1.20, 나태: 0.90
  },
  3: { // 사울의 질투
    슬픔: 1.10, 두려움: 1.45, 희망: 1, 사랑: 0.70, 믿음: 0.90, 화합: 0.40,
    나태: 1, 분노: 1.25,
    탐욕: 1.15, 질투: 1.80, 용기: 1, 절제: 0.70
  },
  4: { // 토빗과 사리
    슬픔: 1.60, 나태: 0.70, 두려움: 1.35, 믿음: 1.15, 희망: 1.35, 절제: 1.00,
    분노: 0.85, 탐욕: 1,
    질투: 1, 사랑: 1.20, 용기: 1, 화합: 1.10
  },
  5: { // 바룩의 좌절
    사랑: 1, 화합: 1, 용기: 1, 절제: 1.10, 슬픔: 1.60,
    나태: 1.30, 탐욕: 0.80, 두려움 : 1.30,
    질투: 1, 분노: 0.80, 믿음: 1.30, 희망: 1.15
  },
  6: { // 착한 사마리아인
    사랑: 1.70, 희망: 1.0, 나태: 0.60, 질투: 1.0, 두려움: 1.15, 슬픔: 1.10,
    탐욕: 0.80, 분노: 1.0,
    믿음: 1, 용기: 1.15, 절제: 1.10, 화합: 1.35
  },
  7: { // 탕자의 비유
    슬픔: 1.10, 믿음: 1.00, 두려움: 1.15, 희망: 1.30, 사랑: 1.60,
    나태: 1.15, 분노: 0.85,
    탐욕: 0.50, 질투: 1.15, 용기: 1, 절제: 1, 화합: 1
  },
  8: { // 라자로의 부활
    화합: 1, 용기: 1.0, 사랑: 1.10, 믿음: 1.45, 희망: 1.25,
    두려움: 1.25, 나태: 0.40, 분노: 0.85, 슬픔: 1.70,
    탐욕: 1, 질투: 1, 절제: 1
  },
  9: { // 오순절 성령 강림
    두려움: 0.40, 용기: 1.45, 화합: 1.80, 사랑: 1.45, 희망: 1.10, 슬픔: 0.90,
    나태: 0.65, 분노: 0.90, 탐욕: 1,
    질투: 1, 믿음: 1.15, 절제: 1
  },
  10: { // 덴마크의 밤배 작전
    두려움: 1.70, 나태: 0.40, 슬픔: 1.10, 사랑: 1.20, 믿음: 1,
    용기: 1.45, 절제: 1, 화합: 1.25,
    탐욕: 0.90, 질투: 1, 분노: 0.70, 희망: 1.15
  }
};

// ==========================
// 뉴스
// ==========================

const newsByRound = {
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

// ==========================
// 증감률 표시
// ==========================

const getEmotionRateLabel = (emotion, round) => {
  const rate = emotionRatesByRound[round]?.[emotion];
  if (!rate || rate === 1) return "0%";
  const percent = Math.round((rate - 1) * 100);
  return percent > 0 ? `+${percent}%` : `${percent}%`;
};

const getEmotionRateColor = (emotion, round) => {
  const rate = emotionRatesByRound[round]?.[emotion];
  if (!rate || rate === 1) return "#8a7a6a";
  return rate > 1 ? "#c62828" : "#1e63b5";
};

// ==========================
// 컴포넌트
// ==========================

const Gamestart = () => {
  const [gameEnd, setGameEnd] = useState(false);
  const [round, setRound] = useState(1);
  const [investments, setInvestments] = useState({});
  const [showResult, setShowResult] = useState(false);

  const [balances, setBalances] = useState({
    team1: 1000000,
    team2: 1000000,
    team3: 1000000,
    team4: 1000000,
    team5: 1000000,
    team6: 1000000
  });

  const handleChange = (team, emotion, value) => {
    const raw = value.replace(/,/g, "");
    if (raw !== "" && !/^\d+$/.test(raw)) return;

    const teamKey = `team${team}`;
    const inputValue = Number(raw || 0);
    const currentData = investments[teamKey] || {};

    const currentTotalExceptThis = Object.entries(currentData).reduce(
      (sum, [e, v]) => (e === emotion ? sum : sum + Number(v || 0)),
      0
    );

    if (currentTotalExceptThis + inputValue > balances[teamKey]) return;

    setInvestments((prev) => ({
      ...prev,
      [teamKey]: {
        ...currentData,
        [emotion]: raw
      }
    }));
  };

  const getTeamTotal = (team) => {
    const data = investments[`team${team}`] || {};
    return Object.values(data).reduce((sum, v) => sum + Number(v || 0), 0);
  };

  const getRemainingBalance = (team) =>
    balances[`team${team}`] - getTeamTotal(team);

  const getTeamProfit = (team) => {
    const data = investments[`team${team}`] || {};
    const rates = emotionRatesByRound[round] || {};
    return Object.entries(data).reduce(
      (sum, [emotion, value]) =>
        sum + Number(value || 0) * (rates[emotion] ?? 1),
      0
    );
  };

  const handleResult = () => {
    const nextBalances = { ...balances };
    teams.forEach((team) => {
      const key = `team${team}`;
      nextBalances[key] = Math.floor(
        balances[key] + (getTeamProfit(team) - getTeamTotal(team))
      );
    });
    setBalances(nextBalances);
    setShowResult(true);
  };

  const nextRound = () => {
    // 10라운드 정산 후 이 버튼을 누르면 최종 순위 화면으로 전환
    if (round === 10) {
      setGameEnd(true);
      return;
    }

    setInvestments({});
    setShowResult(false);
    setRound((r) => r + 1);
  };

  const ranking = teams
    .map((team) => ({
      team,
      money: balances[`team${team}`],
    }))
    .sort((a, b) => b.money - a.money);

  return (
    <S.Container>
      <S.Card2>
        <S.Ribbon aria-hidden="true" />
        {gameEnd ? (
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
            <S.RoundHeader>
              <S.RoundTitle>
                ROUND <strong>{round}</strong>
                <small>/ 10</small>
              </S.RoundTitle>
              <S.RoundDots aria-label={`10라운드 중 ${round}라운드`}>
                {Array.from({ length: 10 }, (_, i) => (
                  <S.RoundDot key={i} $state={i + 1 < round ? "done" : i + 1 === round ? "now" : "todo"} />
                ))}
              </S.RoundDots>
            </S.RoundHeader>

            <S.newscards>
              <S.NewsLabel>📜 오늘의 소식</S.NewsLabel>
              {newsByRound[round]}
            </S.newscards>

            <S.TeamStatusWrap>
              {teams.map((team) => {
                const profit = Math.floor(getTeamProfit(team) - getTeamTotal(team));
                return (
                  <S.TeamStatusCard key={team}>
                    <h4>{team}팀</h4>
                    <div className="money">
                      보유 {formatNumber(balances[`team${team}`])}원
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
                      <S.TeamnameCard>{team}팀</S.TeamnameCard>
                    </S.TeamCell>

                    {emotions.map((emotion) => (
                      <S.InputCell key={emotion}>
                        <input
                          inputMode="numeric"
                          aria-label={`${team}팀 ${emotion} 투자액`}
                          disabled={showResult}
                          value={formatNumber(
                            investments[`team${team}`]?.[emotion] || ""
                          )}
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
                ? round === 10
                  ? "🏆 최종 결과 보기"
                  : "🎄 다음 라운드"
                : "🔔 수익률 확인"}
            </S.ProfitButton>
          </>
        )}
      </S.Card2>
    </S.Container>
  );
};

export default Gamestart;
