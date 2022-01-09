import { RefObject } from "react";
import { Direction } from "../types";

const setHighlight = (ref: RefObject<HTMLDivElement>, highlight: boolean) => {
  if (highlight) ref.current?.setAttribute("data-highlighted", "true");
  else delete ref.current?.dataset.highlighted;
}

export const highlightClue = (cellRefs: RefObject<HTMLDivElement>[], direction: Direction, rows: number, cols: number, currentIdx?: number) => {
  if (currentIdx === undefined || currentIdx === null) return;

  let visitedIndices: number[] = [];
  const targetCellRow = Math.floor(currentIdx / rows);

  if (direction === 'across') {
    // scan to the left
    for (let i = currentIdx; i >= rows * targetCellRow; i--) {
      const filled = cellRefs[i]?.current?.getAttribute("data-filled");
      if (filled) break;
      setHighlight(cellRefs[i], true);
      visitedIndices.push(i);
    }
  
    // scan to the right
    for (let j = currentIdx; j < rows * (targetCellRow + 1); j++) {
      if (!cellRefs?.[j]) break;
      const filled = cellRefs[j]?.current?.getAttribute("data-filled");
      if (filled) break;
      setHighlight(cellRefs[j], true);
      visitedIndices.push(j);
    }
  
  } else {
    // scan up
    for (let i = currentIdx; i > 0; i -= cols) {
      const filled = cellRefs[i]?.current?.getAttribute("data-filled");
      if (filled) break;
      setHighlight(cellRefs[i], true);
      visitedIndices.push(i);
    }

    // scan down
    for (let j = currentIdx; j < rows * cols; j += cols) {
      const filled = cellRefs[j]?.current?.getAttribute("data-filled");
      if (filled) break;
      setHighlight(cellRefs[j], true);
      visitedIndices.push(j);
    }
  }

  // unhighlight remaining cells
  cellRefs.forEach((ref, idx) => {
    if (!visitedIndices.includes(idx)) {
      setHighlight(ref, false);
    }
  })
}