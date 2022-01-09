import { useEffect, RefObject } from "react";
// import { Direction } from "../types";

const getSymmetricCell = (rows: number, cols: number, row: number, col: number): number => {
  return Math.floor(((rows - row) * cols) + (cols - col) - 1);
}

const useEventListener = (setActiveCell: any, rows: number, cols: number, cellRefs: RefObject<HTMLDivElement>[], activeIdx?: number) => {
  useEffect(() => {
    const handleUserKeyPress = (event: any) => {
      if (!activeIdx) return;

      const row = activeIdx / rows;
      const col = activeIdx % rows;

      const activeRef = cellRefs[activeIdx];
      const symmetricRef = cellRefs[getSymmetricCell(rows, cols, row, col)];

      const filled = activeRef?.current?.getAttribute("data-filled");
      console.log(filled, activeIdx);
      const value = activeRef?.current?.getAttribute("data-value");

      const { key, keyCode } = event;
  
      switch (true) {
        // period
        case keyCode === 190:
          activeRef?.current?.setAttribute("data-filled", "true");
          symmetricRef?.current?.setAttribute("data-filled", "true");
          break;
        // delete
        case keyCode === 8:
          if (!value && !filled && (col !== 0)) {
            setActiveCell(activeIdx - 1);
          } else {
            delete activeRef?.current?.dataset.filled;
            delete symmetricRef?.current?.dataset.filled;
            delete activeRef?.current?.dataset.value;
          }
          break;
        // left arrow
        case keyCode === 37:
          if (col !== 0) {
            setActiveCell(activeIdx - 1);
          }
          break;
        // up arrow
        case keyCode === 38:
          if (Math.floor(row) !== 0) {
            setActiveCell(activeIdx - rows);
          }
          break;
        // right arrow
        case keyCode === 39:
          if (col !== rows - 1) {
            setActiveCell(activeIdx + 1);
          }
          break;
        // down arrow
        case keyCode === 40:
          if (Math.ceil(row) !== rows) {
            setActiveCell(activeIdx + rows);
          }
          break;
        case keyCode >= 65 && keyCode <= 90:
          if (!filled) activeRef?.current?.setAttribute("data-value", key);
          if (col !== rows - 1) {
            setActiveCell(activeIdx + 1);
          }
      }
    };
    
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [activeIdx]);
}

export default useEventListener;