export default function DoorOpen({ width = 24, height = 24 }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={height}
			width={width}
			viewBox="0 0 24 24"
		>
			<g
				stroke-linecap="square"
				stroke-width="2"
				fill="none"
				stroke="#212121"
				stroke-linejoin="miter"
				stroke-miterlimit="10"
			>
				<polygon points="4 3 4 20 15 22.5 15 1.5 4 3"></polygon>
				<polyline points="18 20 20 20 20 4 18 4" stroke="#212121"></polyline>
				<line x1="11" y1="13" x2="11" y2="15" stroke="#212121"></line>
			</g>
		</svg>
	);
}
