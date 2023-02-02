type Props = {
	id: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export default function Textarea({
	id,
	label,
	placeholder = "",
	required = false,
	onChange,
}: Props) {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="font-bold text-slate-900">
				{label}
				{required ? (
					<span className="font-display text-xs text-rose-600">*</span>
				) : (
					""
				)}
			</label>
			<textarea
				id={id}
				placeholder={placeholder}
				required={required}
				className="
					h-[200px] bg-slate-100 px-4 py-5 font-serif text-slate-900 transition
					placeholder:italic placeholder:text-slate-400
					hover:bg-slate-200
					focus:bg-slate-200 focus:outline-none
        "
				autoComplete="on"
				onChange={onChange}
			/>
		</div>
	);
}
