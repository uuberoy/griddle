import { gridContainerClass } from "./styled";
import Cell from '../Cell';
import { useEffect, useRef, useState } from 'react';
import useEventListener from "../hooks/useEventListener";
import { computeClueNumbers } from "../utils/clueNumbers";

interface GridProps {
  cols: number;
  rows: number;
}

const Grid = ({ cols, rows }: GridProps) => {
  const cellRefs = new Array(cols * rows).fill(0).map(() => useRef<HTMLDivElement>(null));
  const [clueNumbers, setClueNumbers] = useState<number[]>();
  const [activeIdx, setActiveIdx] = useState<number>();

  // set clue numbers on page load
  useEffect(() => {
    setClueNumbers(computeClueNumbers(cellRefs, rows, cols));
  }, []);
  
  useEventListener(setActiveIdx, rows, cols, cellRefs, setClueNumbers, activeIdx);

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