/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: "var(--font-lexend)",
        inter: "var(--font-inter)",
      },
      backgroundImage: {
        home: 'linear-gradient(to top, #000000CC, #000000BB, #000000BB, #000000CC), url("/home.png")',
      },
      colors: {
        brand: {
          1: "#4529E6",
          2: "#5126EA",
          3: "#B0A6F0",
          4: "#EDEAFD",
          5: "#CACAEF",
        },
        grey: {
          0: "#0B0D0D",
          1: "#212529",
          2: "#495057",
          3: "#868E96",
          4: "#ADB5BD",
          5: "#CED4DA",
          6: "#DEE2E6",
          7: "#E9ECEF",
          8: "#F1F3F5",
          9: "#F8F9FA",
          10: "#FDFDFD",
          whiteFixed: "#FFFFFF",
        },
        feedback: {
          "alert-1": "#CD2B31",
          "alert-2": "#FDD8D8",
          "alert-3": "#FFE5E5",
          "success-1": "#18794E",
          "success-2": "#CCEBD7",
          "success-3": "#DDF3E4",
        },
        "random-profile": {
          1: "#E34D8C",
          2: "#C04277",
          3: "#7D2A4D",
          4: "#7000FF",
          5: "#6200E3",
          6: "#36007D",
          7: "#349974",
          8: "#2A7D5F",
          9: "#153D2E",
          10: "#6100FF",
          11: "#5700E3",
          12: "#30007D",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
