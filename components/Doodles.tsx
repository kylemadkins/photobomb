import { motion } from "framer-motion";
import Link from "next/link";

import { Doodle } from "@/types";

type Props = {
	doodles: Doodle[];
	loading?: boolean;
};

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

export default function Doodles({ doodles, loading = false }: Props) {
	return (
		<motion.div
			className="mx-auto w-[90%] max-w-[1200px]"
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{!loading ? (
				<>
					{doodles.length ? (
						<div className="grid grid-cols-3 gap-8">
							{doodles.map((doodle) => (
								<motion.div key={doodle.id} variants={item}>
									<Link href={`/doodles/${doodle.id}`}>
										<img
											src={doodle.url}
											className="border-[3px] border-slate-900"
										/>
									</Link>
									{doodle.profiles ? (
										<div className="font-display mt-4 text-xs">
											{doodle.profiles.username}
										</div>
									) : (
										""
									)}
								</motion.div>
							))}
						</div>
					) : (
						<div className="flex min-h-[500px] flex-col items-center justify-center text-center">
							<p className="mt-4">No doodles.</p>
						</div>
					)}
				</>
			) : (
				<div className="flex min-h-[500px] flex-col items-center justify-center text-center">
					<div className="animate-hourglass"></div>
				</div>
			)}
		</motion.div>
	);
}
