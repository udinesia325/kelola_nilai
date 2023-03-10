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
                // sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'spin-slow': 'spin 6s linear infinite',
            }
        },
    },
    daisyui: {

    },
    plugins: [require('@tailwindcss/forms'), require("daisyui")],

};
