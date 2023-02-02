import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import Button from "./Button";
import LogoutIcon from "./icon/Logout";

type Props = {
	username?: string | null;
};

export default function Navigation({ username = null }: Props) {
	const supabase = useSupabaseClient();
	const router = useRouter();

	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		if (!error) {
			router.push("/login");
		} else {
			alert(error);
		}
	};

	return (
		<nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-16 py-8">
			<Link href="/" className="flex items-center font-serif text-6xl">
				photob*mb.
			</Link>
			<ul className="flex items-center gap-6 font-bold">
				{username ? (
					<>
						<li className="flex items-center">
							<Link href="/profile">{username}</Link>
						</li>
						<li className="flex items-center">
							<Button onClick={logout} variant="link" title="Logout">
								<LogoutIcon />
							</Button>
						</li>
					</>
				) : (
					<>
						<li className="flex items-center">
							<Link href="/login">Login</Link>
						</li>
						<li className="flex items-center">
							<Button variant="primary" href="/join">
								Join
							</Button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
