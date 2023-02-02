export default function Logout({ height = 32, width = 32 }) {
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
				<polyline
					points="2,21.095 2,2 19,2 19,8 "
					strokeLinecap="butt"
				></polyline>{" "}
				<polyline
					points="2,2 12,8 12,30 2,24 2,2 "
					strokeLinecap="butt"
				></polyline>{" "}
				<line x1="16" y1="12" x2="30" y2="12" strokeLinecap="butt"></line>{" "}
				<polyline points="19,16 19,24 12,24 " strokeLinecap="butt"></polyline>{" "}
				<polyline points=" 24,6 30,12 24,18 "></polyline>
			</g>
		</svg>
	);
}
