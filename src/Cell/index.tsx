import { cellClass, clueNumberClass, filledClass, selectedClass, cellContainerClass, cellValueClass } from "./styled";
import { useState, useEffect, forwardRef } from "react";
import { cx } from 'pretty-lights';
import { Direction } from "../types";

interface CellProps {
  idx: number;
  setActiveCell: any;
  isActive: boolean;
  rows: number;
}

const Cell = forwardRef<HTMLDivElement, CellProps>((props, ref) => {
  const { idx, setActiveCell, isActive, rows } = props;
  const [filled, setFilled] = useState(false);
  const [value, setValue] = useState<string>();
  const [direction, setDirection] = useState<Direction>('across');

  const handleUserKeyPress = (event: any) => {
    const { key, keyCode } = event;

    if (!isActive) return;

    switch (true) {
      // period
      case keyCode === 190:
        setFilled(e => !e);
        break;
      // delete
      case keyCode === 8:
        if (!value && !filled && (idx % rows !== 0)) {
          setActiveCell(idx - 1);
        } else {
          setFilled(false);
          setValue("");
        }
        break;
      // left arrow
      case keyCode === 37:
        if (idx % rows !== 0) {
          setActiveCell(idx - 1);
        }
        break;
      // up arrow
      case keyCode === 38:
        if (Math.floor(idx / rows) !== 0) {
          setActiveCell(idx - rows);
        }
        break;
      // right arrow
      case keyCode === 39:
        if (idx % rows !== rows - 1) {
          setActiveCell(idx + 1);
        }
        break;
      // down arrow
      case keyCode === 40:
        if (Math.ceil(idx / rows) !== rows) {
          setActiveCell(idx + rows);
        }
        break;
      case keyCode >= 65 && keyCode <= 90:
        setValue(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  console.log(direction, setDirection);

  // todo: replace idx with clue number here:
  return (
    <div
      className={cx(cellContainerClass, { [selectedClass]: isActive, [filledClass]: filled })}
      key={idx}
      onClick={() => setActiveCell(idx)}
      ref={ref}
      id={`cell-${idx}`}
    >
      <div className={cellClass}>
        {value && <span className={cellValueClass}>{value.toUpperCase()}</span>}
      </div>
      <span className={clueNumberClass}>{idx + 1}</span>
    </div>
  );
})

Cell.displayName = 'Cell';

export default Cell;