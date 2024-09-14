import Board from "./components/Board";
import Menu from "./components/Menu";
import ToolBox from "./components/Toolbox";
import { socket } from "./socket";

export default function Home() {
  return (
    <>
      <Menu />
      <ToolBox />
      <Board />
    </>
  );
}
