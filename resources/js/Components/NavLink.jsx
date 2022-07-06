import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? "tw-inline-flex tw-items-center tw-px-1 tw-pt-1 tw-border-b-2 tw-border-amber-400 tw-text-sm tw-font-medium tw-leading-5 tw-text-amber-400 focus:tw-outline-none focus:tw-border-indigo-700 tw-transition tw-duration-150 tw-ease-in-out "
                    : "tw-inline-flex tw-items-center tw-px-1 tw-pt-1 tw-border-b-2 tw-border-transparent tw-text-sm tw-font-medium tw-leading-5  hover:tw-text-amber-300 hover:tw-border-amber-300 focus:tw-outline-none focus:tw-text-amber-300 focus:tw-border-amber-300 tw-transition tw-duration-150 tw-ease-in-out tw-text-white"
            }
        >
            {children}
        </Link>
    );
}
