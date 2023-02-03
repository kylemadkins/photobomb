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
		default: `self-start flex gap-2 items-center bg-white px-6 py-3 font-bold text-slate-900 items-center rounded-full ${className}`,
		primary: `self-start flex gap-2 items-center px-6 py-3 font-bold text-white items-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 ${className}`,
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
