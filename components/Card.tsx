import { motion } from "framer-motion";

type Props = {
	children?: React.ReactNode;
};

export default function Card({ children }: Props) {
	return (
		<motion.div
			className="
				relative flex flex-col gap-6 bg-white p-10 shadow-[0_-4px_0_0_#0f172a,4px_4px_0_0_#0f172a,4px_0_0_0_#0f172a,0_4px_0_0_#0f172a]
				before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] before:bg-slate-900 before:content-['']
				after:absolute after:-bottom-5 after:-left-4 after:h-4 after:w-4 after:bg-slate-900 after:content-['']
			"
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
