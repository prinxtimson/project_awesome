import React from "react";

export default function Label({ forInput, value, className, children }) {
    return (
        <label
            htmlFor={forInput}
            className={
                `tw-block tw-font-medium tw-text-sm tw-text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
