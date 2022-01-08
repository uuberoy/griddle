import { css } from 'pretty-lights';

export const gridContainerClass = (columns, rows) => css`
  display: grid;
  grid-template: repeat(${columns}, 1fr) / repeat(${rows}, 1fr);
  background-color: black;
  border: 2px solid black;
  max-width: 650px;
  grid-gap: 1px;
`;