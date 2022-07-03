import React from "react";

export default function ProfileAvatar({ source, handleOnClick = () => {} }) {
    return (
        <div>
            <img
                src={source || "/images/no_img.png"}
                className="tw-rounded-full tw-w-52 tw-h-52"
                onClick={handleOnClick}
            />
        </div>
    );
}
