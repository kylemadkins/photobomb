import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import DefaultLayout from "@/components/DefaultLayout";

export default function Profile() {
	return <DefaultLayout></DefaultLayout>;
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

	return {
		props: {
			initialSession: session,
		},
	};
};
