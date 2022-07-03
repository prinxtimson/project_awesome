import React, { useEffect, useRef, useState } from "react";

export default function PasswordInput({
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
    readOnly,
}) {
    const [visible, setVisible] = useState(false);
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="tw-flex">
            <input
                type={visible ? "text" : "password"}
                name={name}
                value={value}
                className={
                    `tw-border-gray-300 tw-rounded-none focus:tw-border-indigo-300 focus:tw-ring focus:tw-ring-indigo-200 focus:tw-ring-opacity-50 tw-flex-auto tw-shadow-sm tw-rounded-l-md ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
                readOnly={readOnly}
            />
            <button
                type="button"
                className="tw-border tw-flex tw-items-center tw-justify-center tw-p-2 tw-w-12 tw-mt-1 tw-border-gray-300 tw-rounded-r-md tw-bg-slate-200 tw-border-l-0"
                onClick={() => setVisible(!visible)}
            >
                {visible ? (
                    <i className="fa fa-eye-slash"></i>
                ) : (
                    <i className="fa fa-eye"></i>
                )}
            </button>
        </div>
    );
}
