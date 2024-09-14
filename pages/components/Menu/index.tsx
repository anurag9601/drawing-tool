import style from "./index.module.css";
import { IoPencil } from "react-icons/io5";
import { SiEraser } from "react-icons/si";
import { CiUndo } from "react-icons/ci";
import { CiRedo } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { menuItemClick, actionItemClick } from "@/pages/slice/menuSlice";
import { TOOL } from "@/pages/constant";
import cx from "classnames";

export default function Menu() {
  const dispatch = useDispatch();

  const activeMenuItem = useSelector((state: any) => state.menu.activeMenuItem);

  const handleMenuClick = (itemName: string) => {
    dispatch(menuItemClick(itemName));
  };

  const handleActionBtn = (actionName: string) => {
    dispatch(actionItemClick(actionName));
  };

  return (
    <div className={style.menuContainer}>
      <div
        className={cx(style.menuOption, {
          [style.active]: activeMenuItem === TOOL.PENCILE,
        })}
        title="Pencile"
        onClick={() => handleMenuClick(TOOL.PENCILE)}
      >
        <IoPencil />
      </div>
      <div
        className={cx(style.menuOption, {
          [style.active]: activeMenuItem === TOOL.ERASER,
        })}
        title="Eraser"
        onClick={() => handleMenuClick(TOOL.ERASER)}
      >
        <SiEraser />
      </div>
      <div
        className={style.menuOption}
        title="Undo"
        onClick={() => handleActionBtn(TOOL.UNDO)}
      >
        <CiUndo />
      </div>
      <div
        className={style.menuOption}
        title="Redo"
        onClick={() => handleActionBtn(TOOL.REDO)}
      >
        <CiRedo />
      </div>
      <div
        className={style.menuOption}
        title="Download"
        onClick={() => handleActionBtn(TOOL.DOWNLOAD)}
      >
        <IoDownloadOutline />
      </div>
    </div>
  );
}
