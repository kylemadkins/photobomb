import { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import DefaultLayout from "@/components/DefaultLayout";
import Card from "@/components/Card";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Join() {
	const supabase = useSupabaseClient();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const join = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
				},
			},
		});

		if (!error) {
			router.push("/");
		} else {
			alert(error);
		}
	};

	return (
		<DefaultLayout>
			<div className="mx-auto w-10/12 max-w-[600px]">
				<Card>
					<Form onSubmit={join}>
						<Input
							id="username"
							label="Username"
							placeholder="dwaynethepetrock"
							required
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setUsername(evt.target.value)
							}
						/>
						<Input
							id="email"
							label="Email"
							placeholder="hi@example.com"
							required
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(evt.target.value)
							}
						/>
						<Input
							id="password"
							label="Password"
							placeholder="supersecretpw"
							type="password"
							required
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(evt.target.value)
							}
						/>
						<Button variant="primary" className="mt-2">
							Join
						</Button>
					</Form>
					<p className="text-slate-900">
						already have an account?{" "}
						<Link href="/login" className="text-rose-600 underline">
							login
						</Link>
						.
					</p>
				</Card>
			</div>
		</DefaultLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session)
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};

	return {
		props: {
			initialSession: session,
		},
	};
};
