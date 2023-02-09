import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import axios, { AxiosResponse } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import DefaultLayout from "@/components/DefaultLayout";
import Textarea from "@/components/Textarea";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { Post as TPost, Bomb, Prediction } from "@/types";
import { poll, sharedAnimationProps, getImageUrl } from "@/lib";

type Props = {
	post: TPost;
	bombs: Bomb[];
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

export default function Post({ post, bombs = [] }: Props) {
	const supabase = useSupabaseClient();

	const [lastInstructions, setLastInstructions] = useState("");
	const [instructions, setInstructions] = useState("");
	const [prediction, setPrediction] = useState<Prediction | null>(null);
	const [generating, setGenerating] = useState(false);
	const [creating, setCreating] = useState(false);
	const [hasGenerated, setHasGenerated] = useState(false);

	const generateBomb = async (evt: React.MouseEvent) => {
		evt.preventDefault();

		setGenerating(true);

		try {
			const {
				data: { id },
			} = await axios.post("/api/predictions", {
				image: getImageUrl(supabase, "posts", post.image),
				prompt: instructions,
			});

			const { data } = await poll<AxiosResponse>(
				() => axios.get(`/api/predictions/${id}`),
				(res) => !res.data.output,
				1000
			);
			setHasGenerated(true);
			setLastInstructions(instructions);
			setPrediction(data);
		} catch (err) {
			alert(err);
		}
		setGenerating(false);
	};

	const createBomb = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (prediction && prediction.output) {
			setCreating(true);
			try {
				const { data: image } = await axios.get(prediction.output[0], {
					responseType: "blob",
				});
				const { data, error } = await supabase.storage
					.from("bombs")
					.upload(`/${uuidv4()}.png`, image);

				if (!error) {
					const { error } = await supabase.from("bombs").insert({
						post_id: post.id,
						image: data.path,
						instructions: lastInstructions,
					});
				} else {
					alert(error.message);
				}
			} catch (err) {
				alert(err);
			}
			setCreating(false);
		}
	};

	return (
		<DefaultLayout>
			<div className="mx-auto w-10/12 max-w-[1200px]">
				<div className="flex gap-12">
					<div className="w-5/12">
						{generating ? (
							<div className="flex aspect-square w-full flex-col items-center justify-center rounded-3xl border-2 border-slate-700 text-center">
								<motion.div {...sharedAnimationProps}>
									<span className="text-6xl">⌛</span>
									<p>please hold.</p>
								</motion.div>
							</div>
						) : prediction && prediction.output ? (
							<AnimatePresence>
								<motion.img
									src={prediction.output[0] ?? ""}
									className="h-auto w-full rounded-3xl"
									{...sharedAnimationProps}
									exit={{ y: 40, opacity: 0 }}
								/>
							</AnimatePresence>
						) : (
							<AnimatePresence>
								<motion.img
									src={getImageUrl(supabase, "posts", post.image)}
									className="h-auto w-full rounded-3xl"
									{...sharedAnimationProps}
									exit={{ y: 40, opacity: 0 }}
								/>
							</AnimatePresence>
						)}
						{post.profiles ? (
							<motion.div
								className="mt-4 font-display text-sm"
								{...sharedAnimationProps}
							>
								{post.profiles.username}
							</motion.div>
						) : (
							""
						)}
					</div>
					<div className="w-7/12">
						<Card>
							<Form onSubmit={createBomb}>
								<Textarea
									id="instructions"
									label="Instructions"
									placeholder="make him Shrek"
									onChange={(evt) => setInstructions(evt.target.value)}
									required
								/>
								{hasGenerated ? (
									<div className="flex gap-4">
										<Button variant="primary" disabled={generating || creating}>
											Send it 😈
										</Button>
										<Button
											type="button"
											onClick={generateBomb}
											disabled={generating || creating}
										>
											Try again
										</Button>
									</div>
								) : (
									<Button
										variant="primary"
										type="button"
										onClick={generateBomb}
										disabled={generating}
									>
										Photobomb it
									</Button>
								)}
							</Form>
						</Card>
					</div>
				</div>
				<motion.div
					className="mt-12 grid grid-cols-3 gap-8"
					variants={container}
					initial="hidden"
					animate="visible"
				>
					{bombs.map((bomb) => (
						<motion.div key={bomb.id} variants={item}>
							<img
								className="h-72 w-full rounded-3xl object-cover object-top"
								src={getImageUrl(supabase, "bombs", bomb.image)}
								alt=""
							/>
							<div className="mt-4">
								<p>&quot;{bomb.instructions}&quot;</p>
								<p className="font-display text-sm">{bomb.profiles.username}</p>
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

	if (!session)
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};

	const { data: post } = await supabase
		.from("posts")
		.select(
			`id, image, profiles (
				username
			)`
		)
		.eq("id", context.params?.id)
		.limit(1)
		.single();

	const { data: bombs } = await supabase
		.from("bombs")
		.select(
			`id, image, instructions, profiles (
			username
		)`
		)
		.eq("post_id", context.params?.id);

	return {
		props: {
			initialSession: session,
			post,
			bombs,
		},
	};
};
