import React from "react";

export default React.forwardRef(function Toast(props, ref) {
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(true);

    const show = (msg) => {
        setMessage(msg);
        setOpen(false);
        setTimeout(() => {
            setOpen(true);
        }, 2000);
    };

    React.useImperativeHandle(ref, () => ({
        show,
    }));

    return (
        <div
            className="tw-w-96 tw-fixed tw-top-20 tw-right-5 tw-z-50 tw-opacity-90"
            hidden={open}
            ref={ref}
        >
            <div className="tw-border-l-8 tw-rounded-lg tw-my-4 tw-bg-green-200 tw-border-green-600">
                <div className="tw-flex tw-items-center tw-p-5 tw-text-green-600">
                    <span className="tw-text-green-600 tw-text-2xl">
                        <i className="fa fa-check"></i>
                    </span>
                    <span className="tw-mx-2">Success</span>
                    <span className="tw-grow tw-text-green-600">{message}</span>
                </div>
            </div>
        </div>
    );
});
