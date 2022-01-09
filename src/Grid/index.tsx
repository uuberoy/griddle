import { gridContainerClass } from "./styled";
import Cell from '../Cell';
import { useRef, useState } from 'react';
import useEventListener from "../hooks/useEventListener";

interface GridProps {
  cols: number;
  rows: number;
}

const Grid = ({ cols, rows }: GridProps) => {
  const cellRefs = new Array(cols * rows).fill(0).map(() => useRef<HTMLDivElement>(null));
  const [activeIdx, setActiveIdx] = useState<number>();

  useEventListener(setActiveIdx, rows, cols, cellRefs, activeIdx);

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
        />
      )}
    </div>
  );
}

export default Grid;