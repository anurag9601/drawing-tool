import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.css";
import { COLOURS } from "@/pages/constant";
import { TOOL } from "@/pages/constant";
import { changeColor, changeBrushSize } from "@/pages/slice/toolboxSlice";
import cx from "classnames";

export default function ToolBox() {
  const activeMenuItem = useSelector(
    (state: any) => state.menu.activeMenuItem
  );

  const showStrokeToolOption = activeMenuItem === TOOL.PENCILE;
  const showBrushToolOption =
    activeMenuItem === TOOL.PENCILE || activeMenuItem === TOOL.ERASER;

  const dispatch = useDispatch();

  const handleChangeBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const handleChangeColor = (newColor: string) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  const { color, size } = useSelector(
    (state: any) => state.toolkit[activeMenuItem]
  );

  return (
    <div className={style.toolBoxContainer}>
      {showStrokeToolOption && (
        <div className={style.colourChooseArea}>
          <p>Stoke Color</p>
          <div className={style.colours}>
            <div
              className={cx(style.colorContainer, {
                [style.active]: color === COLOURS.BLACK,
              })}
              onClick={() => handleChangeColor(COLOURS.BLACK)}
            >
              <div
                className={style.colour}
                style={{ backgroundColor: COLOURS.BLACK }}
              ></div>
            </div>
            <div
              className={cx(style.colorContainer, {
                [style.active]: color === COLOURS.BLUE,
              })}
              onClick={() => handleChangeColor(COLOURS.BLUE)}
            >
              <div
                className={style.colour}
                style={{ backgroundColor: COLOURS.BLUE }}
              ></div>
            </div>
            <div
              className={cx(style.colorContainer, {
                [style.active]: color === COLOURS.GREEN,
              })}
              onClick={() => handleChangeColor(COLOURS.GREEN)}
            >
              <div
                className={style.colour}
                style={{ backgroundColor: COLOURS.GREEN }}
              ></div>
            </div>
            <div
              className={cx(style.colorContainer, {
                [style.active]: color === COLOURS.YELLOW,
              })}
              onClick={() => handleChangeColor(COLOURS.YELLOW)}
            >
              <div
                className={style.colour}
                style={{ backgroundColor: COLOURS.YELLOW }}
              ></div>
            </div>
            <div
              className={cx(style.colorContainer, {
                [style.active]: color === COLOURS.ORANGE,
              })}
              onClick={() => handleChangeColor(COLOURS.ORANGE)}
            >
              <div
                className={style.colour}
                style={{ backgroundColor: COLOURS.ORANGE }}
              ></div>
            </div>
            <div
              className={cx(style.colorContainer, {
                [style.active]: color === COLOURS.RED,
              })}
              onClick={() => handleChangeColor(COLOURS.RED)}
            >
              <div
                className={style.colour}
                style={{ backgroundColor: COLOURS.RED }}
              ></div>
            </div>
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={style.progressBar}>
          <p>Brush Size</p>
          <input
            type="range"
            min={1}
            max={10}
            value={size}
            step={1}
            onChange={handleChangeBrushSize}
          />
        </div>
      )}
    </div>
  );
}
