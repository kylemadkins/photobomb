import { motion } from "framer-motion";
import Link from "next/link";

import { Post } from "@/types";

type Props = {
	posts: Post[];
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

export default function Posts({ posts, loading = false }: Props) {
	return (
		<motion.div
			className="mx-auto w-[90%] max-w-[1200px]"
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{!loading ? (
				<>
					{posts.length ? (
						<div className="grid grid-cols-3 gap-8">
							{posts.map((post) => (
								<motion.div key={post.id} variants={item}>
									<Link href={`/posts/${post.id}`}>
										<img
											src={post.image}
											className="border-[3px] border-slate-900"
										/>
									</Link>
									{post.profiles ? (
										<div className="font-display mt-4 text-xs">
											{post.profiles.username}
										</div>
									) : (
										""
									)}
								</motion.div>
							))}
						</div>
					) : (
						<div className="flex min-h-[500px] flex-col items-center justify-center text-center">
							<p className="mt-4">No posts.</p>
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
