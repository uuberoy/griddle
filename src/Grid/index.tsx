import { gridContainerClass } from "./styled";
import Cell from '../Cell';
import { useRef, useState } from 'react';

interface GridProps {
  columns: number;
  rows: number;
}

const Grid = ({ columns, rows }: GridProps) => {
  const cellRefs = new Array(columns * rows).fill(0).map(() => useRef<HTMLDivElement>(null));
  const [activeCell, setActiveCell] = useState();

  return (
    <div className={gridContainerClass(columns, rows)}>
      {cellRefs.map((_, idx) =>
        <Cell
          idx={idx}
          key={idx.toString()}
          ref={cellRefs[idx]}
          setActiveCell={setActiveCell}
          isActive={activeCell === idx}
          rows={rows}
        />
      )}
    </div>
  );
}

export default Grid;