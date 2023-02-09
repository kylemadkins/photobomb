import { SupabaseClient } from "@supabase/auth-helpers-react";

export const poll = async function <ResultType>(
	fn: () => Promise<ResultType>,
	fnCondition: (res: ResultType) => boolean,
	ms: number
) {
	const wait = function (ms = 1000) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	};

	let result = await fn();
	while (fnCondition(result)) {
		await wait(ms);
		result = await fn();
	}
	return result;
};

export const sharedAnimationProps = {
	initial: { y: 40, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	transition: {
		type: "spring",
		delay: 0.1,
		stiffness: 260,
		damping: 20,
	},
};

export const getImageUrl = (
	supabase: SupabaseClient,
	bucket: string,
	image: string
) => {
	const { data } = supabase.storage.from(bucket).getPublicUrl(image);
	return data.publicUrl;
};
