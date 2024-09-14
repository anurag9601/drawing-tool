import { useEffect, useRef } from "react";
import style from "./index.module.css";
import { useSelector } from "react-redux";

export default function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeMenuItem = useSelector((state: any) => state.menu.activeMenuItem);

  const { color, size } = useSelector(
    (state: any) => state.toolkit[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context =
      (canvas.getContext("2d") as CanvasRenderingContext2D) || null;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}
