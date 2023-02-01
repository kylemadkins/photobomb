import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import DefaultLayout from "@/components/DefaultLayout";
import Doodles from "@/components/Doodles";
import { Doodle } from "@/types";

type Props = {
	doodles: Doodle[];
};

export default function Home({ doodles = [] }: Props) {
	return (
		<DefaultLayout>
			<div className="mx-auto w-[90%] max-w-[1200px]">
				<Doodles doodles={doodles} />
			</div>
		</DefaultLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: doodles } = await supabase.from("doodles")
		.select(`id, url, profiles (
			username
		)`);

	return {
		props: {
			initialSession: session,
			doodles,
		},
	};
};
