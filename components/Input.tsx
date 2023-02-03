type Props = {
	id: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	type?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Input({
	id,
	label,
	placeholder = "",
	required = false,
	type = "text",
	onChange,
}: Props) {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="font-bold text-slate-400">
				{label}
				{required ? <span className="text-orange-500">*</span> : ""}
			</label>
			<input
				id={id}
				placeholder={placeholder}
				required={required}
				type={type}
				className="
					rounded-lg bg-slate-700 p-4 text-white transition
					placeholder:italic placeholder:text-slate-400
					hover:bg-slate-600
					focus:bg-slate-600 focus:outline-none
        "
				autoComplete="on"
				onChange={onChange}
			/>
		</div>
	);
}
