import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";

import DefaultLayout from "@/components/DefaultLayout";
import Editor from "@/components/Editor";

export default function Doodle() {
	const supabase = useSupabaseClient();

	const uploadDoodle = async (image: Blob) => {
		const { data, error } = await supabase.storage
			.from("doodles")
			.upload(`/${uuidv4()}.png`, image);

		if (!error) {
			const { error } = await supabase.from("doodles").insert({
				url: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.path}`,
			});
		} else {
			alert(error);
		}
	};

	return (
		<DefaultLayout>
			<Editor onUpload={uploadDoodle} />
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

	return {
		props: {
			initialSession: session,
		},
	};
};
