import { GetServerSideProps } from "next";
import Link from "next/link";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import DefaultLayout from "@/components/DefaultLayout";
import { Post } from "@/types";
import { getImageUrl } from "@/lib";

type Props = {
	posts: Post[];
};

export default function Home({ posts }: Props) {
	const supabase = useSupabaseClient();

	return (
		<DefaultLayout>
			<div className="mx-auto w-[90%] max-w-[1200px]">
				<div className="mt-12 grid grid-cols-3 gap-8">
					{posts.map((post) => (
						<div key={post.id}>
							<Link href={`/posts/${post.id}`}>
								<img
									className="rounded-3xl"
									src={getImageUrl(supabase, "posts", post.image)}
								/>
							</Link>
							<div className="mt-4">
								<p>{post.caption}</p>
								<p className="font-serif italic">{post.profiles.username}</p>
							</div>
						</div>
					))}
				</div>
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
