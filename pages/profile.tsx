import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import DefaultLayout from "@/components/DefaultLayout";
import Doodles from "@/components/Doodles";
import { Doodle } from "@/types";

type Props = {
	doodles: Doodle[];
};

export default function Profile({ doodles = [] }: Props) {
	return (
		<DefaultLayout>
			<Doodles doodles={doodles} />
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

	const { data: doodles } = await supabase
		.from("doodles")
		.select()
		.eq("user_id", session.user.id);

	return {
		props: {
			initialSession: session,
			doodles,
		},
	};
};
