import { RefObject } from "react";

const to1D = (row: number, col: number, cols: number): number => {
  return (row * cols) + col;
} 

export const computeClueNumbers = (cellRefs: RefObject<HTMLDivElement>[], rows: number, cols: number): number[] => {
  const clueNumbers = new Array(cols * rows).fill(0);
  let clueIdx = 1;

  cellRefs.forEach((ref, idx) => {
    const row = Math.floor(idx / rows);
    const col = idx % rows;

    const leftCell = col === 0 ? null : cellRefs[to1D(row, col - 1, cols)];
    const topCell = row === 0 ? null : cellRefs[to1D(row - 1, col, cols)];
    const filled = ref?.current?.getAttribute("data-filled");

    // if the cell has a filled square / dead end on the left, give it a number
    if ((leftCell === null || leftCell?.current?.getAttribute("data-filled")) && !filled) {
      clueNumbers[idx] = clueIdx;
      ref?.current?.setAttribute("data-clue-number", clueIdx.toString());
      clueIdx += 1;
    } else if ((topCell === null || topCell?.current?.getAttribute("data-filled")) && !filled) {
      ref?.current?.setAttribute("data-clue-number", clueIdx.toString());
      clueNumbers[idx] = clueIdx;
      clueIdx += 1;
    } else {
      delete ref?.current?.dataset.clueNumber;
      clueNumbers[idx] = 0;
    }
  })

  return clueNumbers;
};