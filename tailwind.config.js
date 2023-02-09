/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Karla"', "sans-serif"],
				display: ['"Unbounded"', "sans-serif"],
			},
		},
	},
	plugins: [],
};
