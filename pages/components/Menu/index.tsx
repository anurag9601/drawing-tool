import style from "./index.module.css";
import { IoPencil } from "react-icons/io5";
import { SiEraser } from "react-icons/si";
import { CiUndo } from "react-icons/ci";
import { CiRedo } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";

export default function Menu() {
  return (
    <div className={style.menuContainer}>
      <div className={style.menuOption} title="Pencile">
        <IoPencil />
      </div>
      <div className={style.menuOption} title="Eraser">
        <SiEraser />
      </div>
      <div className={style.menuOption} title="Undo">
        <CiUndo />
      </div>
      <div className={style.menuOption} title="Redo">
        <CiRedo />
      </div>
      <div className={style.menuOption} title="Download">
        <IoDownloadOutline />
      </div>
    </div>
  );
}
