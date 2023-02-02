export default function Close({ height = 32, width = 32 }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={height}
			width={width}
			viewBox="0 0 32 32"
		>
			<g
				strokeLinecap="square"
				strokeWidth="2"
				fill="none"
				stroke="currentColor"
				strokeLinejoin="miter"
				strokeMiterlimit="10"
			>
				<line x1="27" y1="5" x2="5" y2="27"></line>
				<line x1="27" y1="27" x2="5" y2="5"></line>
			</g>
		</svg>
	);
}
