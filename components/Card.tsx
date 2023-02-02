import { motion } from "framer-motion";

type Props = {
	children?: React.ReactNode;
};

export default function Card({ children }: Props) {
	return (
		<motion.div
			className="flex flex-col gap-6 border-2 border-slate-900 bg-white p-10 shadow-[16px_16px_0_0_#0f172a]"
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				type: "spring",
				delay: 0.1,
				stiffness: 260,
				damping: 20,
			}}
		>
			{children}
		</motion.div>
	);
}
