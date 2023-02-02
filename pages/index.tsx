import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import DefaultLayout from "@/components/DefaultLayout";
import Doodles from "@/components/Doodles";
import { Doodle } from "@/types";

type Props = {};

export default function Home({}: Props) {
	return (
		<DefaultLayout>
			<div className="mx-auto w-[90%] max-w-[1200px]"></div>
		</DefaultLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return {
		props: {
			initialSession: session,
		},
	};
};
