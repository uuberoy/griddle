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
  outline: 1px solid #a7d8ff;
`;

export const filledClass = css`
  background-color: black !important;
`;

export const cellValueClass = css`
  font-size: 1.5rem;
  font-family: 'Roboto Mono', monospace;
`;

export const clueNumberClass = css`
  font-size: 10px;
  font-family: 'Roboto Slab', serif;
  margin-left: 1px;
  position: absolute;
  top: 0;
`;