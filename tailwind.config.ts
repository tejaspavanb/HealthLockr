import type { Config } from "tailwindcss";

export default {
\tcontent: [
\t\t"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
\t\t"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
\t\t"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
\t],
\ttheme: {
\t\textend: {},
\t},
\tplugins: [],
} satisfies Config;

