/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["*.{html,js}","./src/**/*.{html,js}"],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
