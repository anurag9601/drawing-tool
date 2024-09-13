import style from "./index.module.css";
import { COLOURS } from "@/pages/constant";

export default function ToolBox() {
  return (
    <div className={style.toolBoxContainer}>
      <div className={style.colourChooseArea}>
        <p>Stoke Color</p>
        <div className={style.colours}>
          <div
            className={style.colour}
            style={{ backgroundColor: COLOURS.BLACK }}
          ></div>
          <div
            className={style.colour}
            style={{ backgroundColor: COLOURS.BLUE }}
          ></div>
          <div
            className={style.colour}
            style={{ backgroundColor: COLOURS.GREEN }}
          ></div>
          <div
            className={style.colour}
            style={{ backgroundColor: COLOURS.YELLOW }}
          ></div>
          <div
            className={style.colour}
            style={{ backgroundColor: COLOURS.ORANGE }}
          ></div>
          <div
            className={style.colour}
            style={{ backgroundColor: COLOURS.RED }}
          ></div>
        </div>
      </div>
      <div className={style.progressBar}>
        <p>Brush Size</p>
        <input type="range" min={1} max={10} step={1} />
      </div>
    </div>
  );
}
