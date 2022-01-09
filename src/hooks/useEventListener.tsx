import { useEffect, RefObject } from "react";
import { Direction } from "../types";
import { computeClueNumbers } from "../utils/clueNumbers";
import { highlightClue } from "../utils/highlightClue";

const getSymmetricCell = (rows: number, cols: number, row: number, col: number): number => {
  return (Math.abs(rows - row - 1) * cols) + Math.abs(cols - col - 1);
}

const useEventListener = (
  setActiveCell: any,
  rows: number,
  cols: number,
  cellRefs: RefObject<HTMLDivElement>[],
  setClueNumbers: any,
  setDirection: any,
  direction: Direction,
  activeIdx?: number
) => {
  useEffect(() => {
    const handleUserKeyPress = (event: any) => {
      if (activeIdx === undefined || activeIdx === null) return;

      const row = Math.floor(activeIdx / rows);
      const col = activeIdx % rows;

      const activeRef = cellRefs[activeIdx];
      const symmetricRef = cellRefs[getSymmetricCell(rows, cols, row, col)];

      const filled = activeRef?.current?.getAttribute("data-filled");
      const value = activeRef?.current?.getAttribute("data-value");

      const { key, keyCode } = event;
  
      switch (true) {
        // period
        case keyCode === 190:
          if (filled) {
            delete activeRef?.current?.dataset.filled;
            delete symmetricRef?.current?.dataset.filled;
          } else {
            activeRef?.current?.setAttribute("data-filled", "true");
            symmetricRef?.current?.setAttribute("data-filled", "true");

            // advance active cell
            if (direction === 'across' && col < cols - 1)
              setActiveCell(activeIdx + 1);
            else if (direction === 'down' && row < rows - 1)
              setActiveCell(activeIdx + rows);
          }
          setClueNumbers(computeClueNumbers(cellRefs, rows, cols));
          highlightClue(cellRefs, direction, rows, activeIdx);
          break;
        // delete
        case keyCode === 8:
          if (!value && !filled) {
            if (direction === 'across' && col !== 0)
              setActiveCell(activeIdx - 1);
            else if (direction === 'down' && row !== 0)
              setActiveCell(activeIdx - rows);
          } else {
            delete activeRef?.current?.dataset.filled;
            delete symmetricRef?.current?.dataset.filled;
            delete activeRef?.current?.dataset.value;
          }
          setClueNumbers(computeClueNumbers(cellRefs, rows, cols));
          highlightClue(cellRefs, direction, rows, activeIdx);
          break;
        // left arrow
        case keyCode === 37:
          setDirection('across');
          if (col !== 0) {
            setActiveCell(activeIdx - 1);
          }
          break;
        // up arrow
        case keyCode === 38:
          setDirection('down');
          if (Math.floor(row) !== 0) {
            setActiveCell(activeIdx - rows);
          }
          break;
        // right arrow
        case keyCode === 39:
          setDirection('across');
          if (col !== cols - 1) {
            setActiveCell(activeIdx + 1);
          }
          break;
        // down arrow
        case keyCode === 40:
          setDirection('down');
          if (Math.ceil(row) !== rows) {
            setActiveCell(activeIdx + rows);
          }
          break;
        // letters
        case keyCode >= 65 && keyCode <= 90:
          if (!filled) {
            activeRef?.current?.setAttribute("data-value", key);
          }
          if (direction === 'across' && col !== cols - 1) {
            setActiveCell(activeIdx + 1);
          } else if (direction === 'down' && row !== rows - 1) {
            setActiveCell(activeIdx + rows);
          } else {
            setActiveCell(0);
          }
      }
    };

    const handleUserDblClick = () => {
      if (direction === 'across') {
        setDirection('down');
      } else {
        setDirection('across');
      }
    }
    
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("dblclick", handleUserDblClick);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      window.removeEventListener("dblclick", handleUserDblClick);
    };
  }, [activeIdx, direction]);
}

export default useEventListener;