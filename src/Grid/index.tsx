import { gridContainerClass } from "./styled";
import Cell from '../Cell';
import { useEffect, useRef, useState } from 'react';
import useEventListener from "../hooks/useEventListener";
import { computeClueNumbers } from "../utils/clueNumbers";
import { highlightClue } from "../utils/highlightClue";
import { Direction } from "../types";

interface GridProps {
  cols: number;
  rows: number;
}

const Grid = ({ cols, rows }: GridProps) => {
  const cellRefs = new Array(cols * rows).fill(0).map(() => useRef<HTMLDivElement>(null));
  const [clueNumbers, setClueNumbers] = useState<number[]>();
  const [activeIdx, setActiveIdx] = useState<number>();
  const [direction, setDirection] = useState<Direction>('across');

  // set clue numbers on page load
  useEffect(() => {
    setClueNumbers(computeClueNumbers(cellRefs, rows, cols));
  }, []);

  // set highlight on active cell change
  useEffect(() => {
    highlightClue(cellRefs, direction, rows, cols, activeIdx);
  }, [activeIdx, direction]);
  
  useEventListener(
    setActiveIdx,
    rows,
    cols,
    cellRefs,
    setClueNumbers,
    setDirection,
    direction,
    activeIdx
  );

  return (
    <div className={gridContainerClass(cols, rows)}>
      {cellRefs.map((_, idx) =>
        <Cell
          idx={idx}
          key={idx.toString()}
          ref={cellRefs[idx]}
          setActiveCell={setActiveIdx}
          rows={rows}
          cols={cols}
          activeIdx={activeIdx}
          value={cellRefs[idx]?.current?.getAttribute("data-value") || ""}
          clueNumber={clueNumbers?.[idx] || 0}
        />
      )}
    </div>
  );
}

export default Grid;