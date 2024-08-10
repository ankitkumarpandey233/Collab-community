import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			"light",
			{
				black: {
					...daisyUIThemes["black"],
					// primary: "rgb(29, 155, 240)",
					primary: "rgb(16, 185, 129)", // Changed to emerald green
					secondary: "rgb(24, 24, 24)",
				},
			},
		],
	},
};
