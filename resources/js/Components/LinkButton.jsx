import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function LinkButton({ href, children, className = "" }) {
    return (
        <Link
            href={href}
            className={`tw-px-4 tw-py-2 tw-bg-gray-900 tw-border tw-border-transparent tw-rounded-md tw-font-semibold tw-text-xs tw-text-white tw-uppercase tw-tracking-widest active:tw-bg-gray-900 tw-transition tw-ease-in-out text-center tw-duration-150 ${className} `}
        >
            {children}
        </Link>
    );
}
