import { useState } from "react";
import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";

import DefaultLayout from "@/components/DefaultLayout";
import { Doodle as IDoodle } from "@/types";
import Textarea from "@/components/Textarea";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Form from "@/components/Form";

type Props = {
	doodle: IDoodle;
};

export default function Doodle({ doodle }: Props) {
	const supabase = useSupabaseClient();

	const [prompt, setPrompt] = useState("");

	const remix = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		axios
			.post("/api/predictions", { prompt })
			.then(({ data }) => {
				console.log(data);
			})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<DefaultLayout>
			<div className="mx-auto flex w-[90%] max-w-[1200px] gap-12">
				<div className="w-1/2">
					<img
						src={`${doodle.url}`}
						className="aspect-square w-full border-4 border-slate-900"
					/>
					{doodle.profiles ? (
						<div className="font-display mt-4 text-xs">
							{doodle.profiles.username}
						</div>
					) : (
						""
					)}
				</div>
				<div className="w-1/2">
					<Card>
						<Form onSubmit={remix}>
							<Textarea
								id="prompt"
								label="Prompt"
								placeholder="Enter a prompt..."
								onChange={(evt) => setPrompt(evt.target.value)}
								required
							/>
							<Button variant="primary">Remix</Button>
						</Form>
					</Card>
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

	if (!session)
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};

	const { data: doodle } = await supabase
		.from("doodles")
		.select(
			`id, url, profiles (
			username
		)`
		)
		.eq("id", context.params?.id)
		.limit(1)
		.single();

	return {
		props: {
			initialSession: session,
			doodle,
		},
	};
};
