import React from "react";

export default function ProfileAvatar({
    source,
    handleOnClick = () => {},
    isEdit = false,
}) {
    return (
        <div
            className={`tw-relative ${
                isEdit && "tw-cursor-pointer hover:tw-opacity-80"
            }`}
        >
            <img
                src={source || "/images/no_img.png"}
                className={`tw-rounded-full tw-w-52 tw-h-52 `}
                onClick={handleOnClick}
            />
            {isEdit && (
                <div className="tw-absolute tw-bottom-0 tw-right-5">
                    <span className={`fa fa-camera tw-text-3xl `}></span>
                </div>
            )}
        </div>
    );
}
