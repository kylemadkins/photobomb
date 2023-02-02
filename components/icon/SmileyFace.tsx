export default function SmileyFace({ height = 32, width = 32 }) {
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
				<circle cx="19.5" cy="29.5" r="2.5"></circle>
				<circle cx="44.5" cy="29.5" r="2.5"></circle>
				<circle cx="32" cy="32" r="28"></circle>
				<path d="M42.4,42a12,12,0,0,1-20.79,0"></path>
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
