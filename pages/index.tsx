import { GetServerSideProps } from "next";
import Link from "next/link";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";

import DefaultLayout from "@/components/DefaultLayout";
import { Post } from "@/types";
import { getImageUrl } from "@/lib";

type Props = {
	posts: Post[];
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

export default function Home({ posts }: Props) {
	const supabase = useSupabaseClient();

	return (
		<DefaultLayout>
			<div className="mx-auto w-[90%] max-w-[1200px]">
				<motion.div
					className="mt-12 grid grid-cols-3 gap-8"
					variants={container}
					initial="hidden"
					animate="visible"
				>
					{posts.map((post) => (
						<motion.div key={post.id} variants={item}>
							<Link href={`/posts/${post.id}`}>
								<img
									className="h-72 w-full rounded-3xl object-cover object-top"
									src={getImageUrl(supabase, "posts", post.image)}
									alt=""
								/>
							</Link>
							<div className="mt-4">
								<p>{post.caption}</p>
								<p className="font-display text-sm text-gray-500">
									{post.profiles.username}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</DefaultLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: posts } = await supabase.from("posts").select(
		`id, image, caption, profiles (
				username
			)`
	);

	return {
		props: {
			initialSession: session,
			posts,
		},
	};
};
