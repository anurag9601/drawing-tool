import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOOL } from "@/pages/constant";
import { actionItemClick } from "@/pages/slice/menuSlice";
import { socket } from "@/pages/socket";

export default function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldDraw = useRef<boolean>(false);
  const dispatch = useDispatch();
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const onTimeRef = useRef<boolean>(true);

  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: any) => state.menu
  );

  const { color, size } = useSelector(
    (state: any) => state.toolkit[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context =
      (canvas.getContext("2d") as CanvasRenderingContext2D) || null;

    if (actionMenuItem === TOOL.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (actionMenuItem === TOOL.UNDO) {
      if (historyPointer.current > 0) historyPointer.current -= 1;
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    } else if (actionMenuItem === TOOL.REDO) {
      if (historyPointer.current < drawHistory.current.length - 1)
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context =
      (canvas.getContext("2d") as CanvasRenderingContext2D) || null;

    const changeConfig = (color: string, size: number) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    const handleSocketChangeConfig = (arg: any) => {
      changeConfig(arg.color, arg.size);
      console.log(arg.color, arg.size);
    };

    socket.on("changeConfig", handleSocketChangeConfig);

    changeConfig(color, size);
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context =
      (canvas.getContext("2d") as CanvasRenderingContext2D) || null;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    if (onTimeRef.current) {
      onTimeRef.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    }

    const beginPath = (x: number, y: number) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
      socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    const handleSocketBeginPath = (arg: any) => {
      beginPath(arg.x, arg.y);
    };

    const handleSocketDrawLine = (arg: any) => {
      drawLine(arg.x, arg.y);
    };

    socket.on("beginPath", handleSocketBeginPath);
    socket.on("drawLine", handleSocketDrawLine);

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      socket.off("beginPath", handleSocketBeginPath);
      socket.off("drawLine", handleSocketDrawLine);
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}
