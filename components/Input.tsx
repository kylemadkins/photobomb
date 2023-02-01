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
			<label htmlFor={id} className="font-bold text-slate-900">
				{label}
				{required ? <span className="text-regalPurple">*</span> : ""}
			</label>
			<input
				placeholder={placeholder}
				required={required}
				type={type}
				className="
					bg-slate-100 p-4 font-serif text-slate-900
          placeholder:text-slate-400 focus:bg-slate-200 focus:outline-none
        "
				autoComplete="on"
				onChange={onChange}
			/>
		</div>
	);
}
