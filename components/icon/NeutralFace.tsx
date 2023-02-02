export default function NeutralFace({ height = 32, width = 32 }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={height}
			width={width}
			viewBox="0 0 64 64"
		>
			<g
				strokeLinecap="square"
				strokeWidth="2"
				fill="none"
				stroke="currentColor"
				strokeLinejoin="miter"
				strokeMiterlimit="10"
			>
				<line x1="20" y1="44" x2="44" y2="44"></line>
				<circle cx="19.5" cy="29.5" r="2.5"></circle>
				<circle cx="44.5" cy="29.5" r="2.5"></circle>
				<circle cx="32" cy="32" r="28"></circle>
				<circle
					cx="19.5"
					cy="29.5"
					r="2.5"
					stroke="none"
					fill="currentColor"
				></circle>
				<circle
					cx="44.5"
					cy="29.5"
					r="2.5"
					stroke="none"
					fill="currentColor"
				></circle>
			</g>
		</svg>
	);
}
