import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const fall = keyframes`
  0%   { transform: translate3d(0, -10vh, 0); }
  100% { transform: translate3d(var(--drift), 110vh, 0); }
`;

const Layer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Flake = styled.span`
  position: absolute;
  top: 0;
  border-radius: 50%;
  background: #fff;
  will-change: transform;
  animation: ${fall} linear infinite;
`;

const FLAKE_COUNT = 45;

// 화면 전체에 은은하게 내리는 눈 (클릭을 막지 않음)
const Snow = () => {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, (_, i) => {
        const size = 2 + Math.random() * 4;
        return {
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: 0.35 + Math.random() * 0.5,
            animationDuration: `${9 + Math.random() * 12}s`,
            animationDelay: `${-Math.random() * 20}s`,
            "--drift": `${(Math.random() - 0.5) * 120}px`,
          },
        };
      }),
    []
  );

  return (
    <Layer aria-hidden="true">
      {flakes.map((f) => (
        <Flake key={f.id} style={f.style} />
      ))}
    </Layer>
  );
};

export default Snow;
