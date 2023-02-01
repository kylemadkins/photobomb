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

export default function Login() {
	const supabase = useSupabaseClient();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
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
					<Form onSubmit={login}>
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
							Login
						</Button>
					</Form>
					<p className="text-slate-900">
						don&apos;t have an account?{" "}
						<Link href="/join" className="text-regalPurple underline">
							join
						</Link>
						, dummy.
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
