/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				hourglass: {
					"0%, 50%": { transform: "rotate(0deg)" },
					"50%, 100%": { transform: "rotate(180deg)" },
				},
			},
			animation: {
				hourglass: "hourglass 1s ease-in-out infinite",
			},
			fontFamily: {
				sans: ['"Karla"', "sans-serif"],
				serif: ['"Piazzola"', "serif"],
			},
		},
	},
	plugins: [],
};
