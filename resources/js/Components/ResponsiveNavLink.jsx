import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function ResponsiveNavLink({
    method = "get",
    as = "a",
    href,
    active = false,
    children,
}) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`tw-w-full tw-flex tw-items-start tw-pl-3 tw-pr-4 tw-py-2 tw-border-l-4 ${
                active
                    ? "tw-border-indigo-400 tw-text-indigo-700 tw-bg-indigo-50 focus:tw-outline-none focus:tw-text-indigo-800 focus:tw-bg-indigo-100 focus:tw-border-indigo-700"
                    : "tw-border-transparent tw-text-gray-600 tw-hover:tw-text-gray-800 tw-hover:tw-bg-gray-50 tw-hover:tw-border-gray-300"
            } tw-text-base tw-font-medium focus:tw-outline-none tw-transition tw-duration-150 tw-ease-in-out`}
        >
            {children}
        </Link>
    );
}
