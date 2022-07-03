import React from "react";

export default function Button({
    type = "submit",
    className = "",
    processing,
    children,
    onClick = () => {},
}) {
    return (
        <button
            type={type}
            className={
                `tw-px-4 tw-py-2 tw-bg-gray-900 tw-border tw-border-transparent tw-rounded-md tw-font-semibold tw-text-xs tw-text-white tw-uppercase tw-tracking-widest active:tw-bg-gray-900 tw-transition tw-ease-in-out text-center tw-duration-150 ${
                    processing && "tw-opacity-25"
                } ` + className
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
