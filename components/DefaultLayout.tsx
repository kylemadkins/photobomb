import { useUser } from "@supabase/auth-helpers-react";

import Navigation from "@/components/Navigation";

type Props = {
	children?: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
	const user = useUser();

	return (
		<div className="gradientBg min-h-full pb-[100px]">
			<Navigation username={user?.user_metadata.username} />
			<div className="mt-[60px]">{children}</div>
		</div>
	);
}
