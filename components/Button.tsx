import Link from "next/link";

type Props = {
	href?: string;
	className?: string;
	variant?: "link" | "default" | "primary" | null;
	title?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "reset" | "submit";
	children?: React.ReactNode;
};

export default function Button({
	href,
	className,
	variant = null,
	title = "",
	onClick,
	children,
	type,
}: Props) {
	const variants = {
		default: `border-2 border-slate-900 self-start flex gap-2 items-center bg-white px-6 py-2 font-bold text-slate-900 items-center ${className}`,
		primary: `border-2 border-slate-900 self-start flex gap-2 items-center bg-rose-600 px-6 py-2 font-bold text-white items-center ${className}`,
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
			type={type}
		>
			{children}
		</button>
	);
}
