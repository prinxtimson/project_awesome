import React from "react";

export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="tw-rounded tw-border-gray-300 tw-text-indigo-600 tw-shadow-sm focus:tw-border-indigo-300 focus:tw-ring focus:tw-ring-indigo-200 focus:tw-ring-opacity-50"
            onChange={(e) => handleChange(e)}
        />
    );
}
