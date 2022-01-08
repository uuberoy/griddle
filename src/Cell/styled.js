import { css } from "pretty-lights";

export const cellContainerClass = css`
  background-color: white;
  aspect-ratio: 1;
  position: relative;

  &:hover {
    background: #eee;
    cursor: pointer;
  }
`;

export const cellClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const selectedClass = css`
  background-color: #ffda00 !important;
`;

export const filledClass = css`
  background-color: black !important;
`;

export const cellValueClass = css`
  font-size: 1.5rem;
`;

export const clueNumberClass = css`
  font-size: 8px;
  position: absolute;
  top: 0;
`;