import { useEffect, useRef } from "react";
import style from "./index.module.css";

export default function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
