const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {

                    "primary": "#60a5fa",

                    "secondary": "#fb7185",

                    "accent": "#4ade80",

                    "neutral": "#1E1C31",

                    "base-100": "#FCFCFD",

                    "info": "#67e8f9",

                    "success": "#34d399",

                    "warning": "#fde047",

                    "error": "#ef4444",
                },
            },
        ],
    },
    plugins: [require('@tailwindcss/forms'), require("daisyui")],

};
