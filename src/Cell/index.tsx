import { cellClass, clueNumberClass, selectedClass, cellContainerClass, cellValueClass } from "./styled";
import { forwardRef } from "react";
import { cx } from 'pretty-lights';

interface CellProps {
  idx: number;
  setActiveCell: any;
  activeIdx?: number;
  rows: number;
  cols: number;
  value?: string;
  clueNumber?: number;
}

const Cell = forwardRef<HTMLDivElement, CellProps>((props, ref) => {
  const { idx, setActiveCell, activeIdx, value, clueNumber } = props;

  return (
    <div
      className={cx(cellContainerClass, { [selectedClass]: activeIdx === idx })}
      key={idx}
      onClick={() => setActiveCell(idx)}
      ref={ref}
      id={`cell-${idx}`}
    >
      <div className={cellClass}>
        {value && <span className={cellValueClass}>{value.toUpperCase()}</span>}
      </div>
      <span className={clueNumberClass}>{clueNumber || ""}</span>
    </div>
  );
})

Cell.displayName = 'Cell';

export default Cell;