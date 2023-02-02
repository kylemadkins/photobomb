import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

import ImageIcon from "./icon/Image";
import NeutralFaceIcon from "./icon/NeutralFace";
import SmileyFaceIcon from "./icon/SmileyFace";

type Props = {
	onUpload: (image: File) => void;
};

export default function ImageUpload({ onUpload }: Props) {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length) {
			onUpload(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			onDrop,
			multiple: false,
			accept: {
				"image/jpeg": [],
				"image/png": [],
			},
		});

	return (
		<motion.div
			className="relative flex w-5/12 flex-col border-2 border-slate-900"
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				type: "spring",
				delay: 0.1,
				stiffness: 260,
				damping: 20,
			}}
		>
			<div
				{...getRootProps()}
				className="flex aspect-square min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 px-4 py-8 text-center text-slate-900"
			>
				<input {...getInputProps()} />

				{isDragReject ? (
					<>
						<NeutralFaceIcon height={96} width={96} />
						<p>sir this is a Wendy's.</p>
					</>
				) : isDragActive ? (
					<>
						<SmileyFaceIcon height={96} width={96} />
						<p>drop it</p>
					</>
				) : (
					<>
						<ImageIcon height={96} width={96} />
						<div>
							<p className="font-serif text-lg italic">drag and drop</p>
							<p>
								or <span className="font-serif text-lg italic">click</span> to
								select a photo
							</p>
						</div>
					</>
				)}
			</div>
		</motion.div>
	);
}