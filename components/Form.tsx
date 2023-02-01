type Props = {
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	children?: React.ReactNode;
};

export default function Form({ onSubmit, children }: Props) {
	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-6">
			{children}
		</form>
	);
}
