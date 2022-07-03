const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        "./node_modules/primereact/resources/primereact.min.css",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    prefix: "tw-",
    plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
