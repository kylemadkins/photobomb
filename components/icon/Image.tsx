export default function Image({ height = 32, width = 32 }) {
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
				<rect x="8" y="3" width="48" height="58"></rect>
				<rect x="14" y="9" width="36" height="32"></rect>
				<circle cx="26" cy="20" r="4"></circle>
				<polyline points="21 41 39 23 50 33" strokeLinecap="butt"></polyline>
			</g>
		</svg>
	);
}
