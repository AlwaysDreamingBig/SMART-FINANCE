import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#50F55E",
          DEFAULT: "#07731F",
        },
        red_special: "#FF7474",
        error: "#b80000",
        green_special: "#3DD9B3",
        blue_special: "#56B8FF",
        pink_special: "#EEA8FD",
        orange_special: "#F9AB72",
        dollar: "#4CAF50",
        euro: "#FFD700",
        yen: "#FF5733",
        won: "#009C8C",
        ruble: "#F44336",
        yuan: "#FF6F61",
        pound: "#8B4513",
        inr: "#FF5722",
        franc: "#008B8B",
        try: "#DC143C",
        uah: "#00BFFF",
        ils: "#32CD32",
        peso: "##4416b8",
        thb: "#FF1493",
        colon: "#4B0082",
        aed: "#B0E0E6",
        sar: "#4682B4",
        pyg: "#cc1818",
        inputs: "#EEFFF2",
        light: {
          100: "#333F4E",
          200: "#A3B2C7",
          300: "#F2F5F9",
          400: "#F2F4F8",
        },
        dark: {
          100: "#04050C",
          200: "#131524",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      boxShadow: {
        "drop-1": "0px 10px 30px 0px rgba(66, 71, 97, 0.1)",
        "drop-2": "0 8px 30px 0 rgba(65, 89, 214, 0.3)",
        "drop-3": "0 8px 30px 0 rgba(65, 89, 214, 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        bounceCircle: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-30px)",
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
