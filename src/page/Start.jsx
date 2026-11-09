import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Style";

const teams = [1, 2, 3, 4, 5, 6];

const rules = [
  ["초기 자금", "1,000,000 원"],
  ["정보 코인", "7개 지급"],
  ["진행", "총 10라운드"],
  ["투자 대상", "12개의 감정"],
  ["승리 조건", "최종 자산이 가장 높은 팀"],
];

// [감정, 색 구분] — 기존 화면의 두 색 구분(ecard / ecard2)을 그대로 유지
const emotions = [
  ["탐욕", "green"], ["사랑", "red"], ["질투", "green"], ["믿음", "red"],
  ["분노", "green"], ["용기", "red"], ["나태", "green"], ["희망", "red"],
  ["슬픔", "green"], ["절제", "red"], ["두려움", "green"], ["화합", "red"],
];

const Start = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Card>
        <S.Ribbon aria-hidden="true" />

        <S.Header>
          <S.Eyebrow>✦ 2026 Christmas ✦</S.Eyebrow>
          <S.Title>
            신(내)의 한수
            <S.TitleSub>감정 투자 대작전</S.TitleSub>
          </S.Title>
          <S.SubTitle>🎄 신내동 투자왕은 누구!? 🎄</S.SubTitle>
        </S.Header>

        <S.Section>
          <S.SectionHead>
            <S.SectionTitle>🎁 참가 팀</S.SectionTitle>
            <S.Badge>6 / 6</S.Badge>
          </S.SectionHead>
          <S.TeamGrid>
            {teams.map((t) => (
              <S.Team key={t} $index={t}>
                <S.Bauble aria-hidden="true" $index={t} />
                Team {t}
              </S.Team>
            ))}
          </S.TeamGrid>
        </S.Section>

        <S.Section>
          <S.SectionHead>
            <S.SectionTitle>📜 게임 설명</S.SectionTitle>
          </S.SectionHead>
          <S.RuleList>
            {rules.map(([k, v]) => (
              <S.Rule key={k}>
                <S.RuleKey>{k}</S.RuleKey>
                <S.RuleValue>{v}</S.RuleValue>
              </S.Rule>
            ))}
          </S.RuleList>
        </S.Section>

        <S.Section>
          <S.SectionHead>
            <S.SectionTitle>🔔 감정 투자 리스트</S.SectionTitle>
          </S.SectionHead>
          <S.EmotionGrid>
            {emotions.map(([name, tone]) => (
              <S.Emotion key={name} $tone={tone}>
                {name}
              </S.Emotion>
            ))}
          </S.EmotionGrid>
        </S.Section>

        <S.StartButton type="button" onClick={() => navigate("/Gamestart")}>
          🎅 게임 시작하기
        </S.StartButton>
      </S.Card>
    </S.Container>
  );
};

export default Start;
