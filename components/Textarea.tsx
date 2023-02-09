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
			<label htmlFor={id} className="font-bold text-slate-400">
				{label}
				{required ? (
					<span className="font-display text-xs text-orange-500">*</span>
				) : (
					""
				)}
			</label>
			<textarea
				id={id}
				placeholder={placeholder}
				required={required}
				className="
					h-[200px] rounded-md bg-slate-700 p-4 text-white transition
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
