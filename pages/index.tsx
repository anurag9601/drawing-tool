import Board from "./components/Board";
import Menu from "./components/Menu";
import ToolBox from "./components/Toolbox";
import { socket } from "./socket";

export default function Home() {
  socket.on("connect", () => {
    console.log(`client connected with id ${socket.id}`);
  });
  return (
    <>
      <Menu />
      <ToolBox />
      <Board />
    </>
  );
}
