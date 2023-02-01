import Link from "next/link";

type Props = {
	href?: string;
	className?: string;
	variant?: "link" | "default" | "primary" | null;
	title?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
};

export default function Button({
	href,
	className,
	variant = null,
	title = "",
	onClick,
	children,
}: Props) {
	const variants = {
		default: `relative shadow-[0_-3px_0_0_#0f172a,3px_3px_0_0_#0f172a,3px_0_0_0_#0f172a,0_3px_0_0_#0f172a] self-start flex gap-2 items-center bg-white px-6 py-2 font-bold text-slate-900 items-center before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-slate-900 before:content-[''] ${className}`,
		primary: `relative shadow-[0_-3px_0_0_#0f172a,3px_3px_0_0_#0f172a,3px_0_0_0_#0f172a,0_3px_0_0_#0f172a] self-start flex gap-2 items-center bg-regalPurple px-6 py-2 font-bold text-white items-center before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-slate-900 before:content-[''] ${className}`,
		link: `font-bold ${className}`,
	};

	if (href)
		return (
			<Link
				href={href}
				title={title}
				className={variant ? variants[variant] : variants.default}
			>
				{children}
			</Link>
		);

	return (
		<button
			title={title}
			className={variant ? variants[variant] : variants.default}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
