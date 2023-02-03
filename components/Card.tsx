import { motion } from "framer-motion";

type Props = {
	children?: React.ReactNode;
};

export default function Card({ children }: Props) {
	return (
		<motion.div
			className="flex flex-col gap-6 rounded-3xl bg-slate-800 py-10 px-12"
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
