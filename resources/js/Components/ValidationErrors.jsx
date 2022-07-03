import React from "react";

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div className="tw-mb-4">
                <div className="tw-font-medium tw-text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="tw-mt-3 tw-list-disc tw-list-inside tw-text-sm tw-text-red-600">
                    {Object.keys(errors).map(function (key, index) {
                        return <li key={index}>{errors[key]}</li>;
                    })}
                </ul>
            </div>
        )
    );
}
