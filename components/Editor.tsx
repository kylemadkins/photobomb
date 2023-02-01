import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Button from "./Button";

type Props = {
	onUpload: (image: Blob) => void;
};

export default function Editor({ onUpload }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const clearCanvas = () => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			const { width, height } = canvas.getBoundingClientRect();

			if (ctx) {
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, width, height);
			}
		}
	};

	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");

			const { width, height, left, top } = canvas.getBoundingClientRect();
			canvas.width = width;
			canvas.height = height;
			const canvasOffsetX = left;
			const canvasOffsetY = top - 40;

			let doodling = false;
			let lineWidth = 5;

			clearCanvas();

			const resetDoodle = () => {
				doodling = false;

				if (ctx) {
					ctx.stroke();
					ctx.beginPath();
				}
			};

			const doodle = (evt: MouseEvent) => {
				if (!doodling) {
					return;
				}

				if (ctx) {
					ctx.lineWidth = lineWidth;
					ctx.lineCap = "round";
					ctx.strokeStyle = "#000";

					ctx.lineTo(evt.clientX - canvasOffsetX, evt.clientY - canvasOffsetY);
					ctx.stroke();
				}
			};

			canvas.addEventListener("mousedown", () => {
				doodling = true;
			});

			canvas.addEventListener("mousemove", doodle);

			canvas.addEventListener("mouseup", resetDoodle);
			canvas.addEventListener("mouseleave", resetDoodle);
		}
	}, []);

	const handleUpload = () => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			canvas.toBlob(async (blob) => {
				if (blob) {
					onUpload(blob);
				}
			});
		}
	};

	return (
		<div>
			<motion.div
				className="mx-auto aspect-square w-[90%] max-w-[500px] border-4 border-slate-900"
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					type: "spring",
					delay: 0.1,
					stiffness: 260,
					damping: 20,
				}}
			>
				<canvas
					ref={canvasRef}
					className="h-full w-full cursor-crosshair bg-white"
				/>
			</motion.div>
			<motion.div
				className="mx-auto mt-4 flex w-[90%] max-w-[500px] gap-4"
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					type: "spring",
					delay: 0.3,
					stiffness: 260,
					damping: 20,
				}}
			>
				<Button variant="primary" onClick={handleUpload}>
					Send
				</Button>
				<Button onClick={clearCanvas} className="self-stretch">
					Clear
				</Button>
			</motion.div>
		</div>
	);
}
