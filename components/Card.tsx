import { motion } from "framer-motion";

import { sharedAnimationProps } from "@/lib";

type Props = {
	children?: React.ReactNode;
};

export default function Card({ children }: Props) {
	return (
		<motion.div
			className="flex flex-col gap-6 rounded-lg bg-slate-800 py-10 px-12"
			{...sharedAnimationProps}
		>
			{children}
		</motion.div>
	);
}
