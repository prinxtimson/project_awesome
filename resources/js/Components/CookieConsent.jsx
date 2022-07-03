import React from "react";
import Cookies from "universal-cookie";

const CookieConsent = () => {
    const cookies = new Cookies();
    const [isDeclined, setIsDeclined] = React.useState(false);
    //const [cookies, setCookie] = useCookies(['awesome-gdpr']);

    React.useEffect(() => {
        setTimeout(() => {
            if (!cookies.get("awesome-gdpr")) {
                toggleModal();
            }
        }, 1500);
    }, []);

    const toggleModal = () => {
        const cookieModal = document.getElementById("cookieModal");

        if (cookieModal.classList.contains("hidden")) {
            cookieModal.classList.remove("hidden");
        } else {
            cookieModal.classList.add("hidden");
        }
    };

    const onAcceptClick = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        cookies.set("awesome-gdpr", true, { expires: d });
        toggleModal();
    };

    const onDeclineClick = () => setIsDeclined(true);

    return (
        <div
            id="cookieModal"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            data-modal-placement="center-center"
            className="tw-hidden tw-overflow-y-auto tw-overflow-x-hidden tw-fixed  tw-z-50 tw-w-full md:tw-inset-0 tw-h-modal md:tw-h-full "
        >
            <div className="tw-relative tw-p-4 tw-w-full tw-max-w-2xl tw-h-full md:tw-h-auto tw-mt-20 tw-mx-auto">
                <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow dark:tw-bg-gray-700">
                    <div className="tw-flex tw-justify-between tw-items-start tw-p-4 tw-rounded-t tw-border-b dark:tw-border-gray-600 ">
                        <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900 dark:tw-text-white">
                            GDPR Compliance
                        </h3>
                    </div>
                    {isDeclined ? (
                        <div className="tw-p-6 tw-space-y-6">
                            <p className="tw-text-base tw-leading-relaxed tw-text-gray-500 dark:tw-text-gray-400">
                                You are not allowed to continue access to this
                                site.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="tw-p-6 tw-space-y-6">
                                <p className="tw-text-base tw-leading-relaxed tw-text-gray-500 dark:tw-text-gray-400">
                                    With less than a month to go before the
                                    European Union enacts new consumer privacy
                                    laws for its citizens, companies around the
                                    world are updating their terms of service
                                    agreements to comply.
                                </p>
                                <p className="tw-text-base tw-leading-relaxed tw-text-gray-500 dark:tw-text-gray-400">
                                    The European Union’s General Data Protection
                                    Regulation (G.D.P.R.) goes into effect on
                                    May 25 and is meant to ensure a common set
                                    of data rights in the European Union. It
                                    requires organizations to notify users as
                                    soon as possible of high-risk data breaches
                                    that could personally affect them.
                                </p>
                            </div>

                            <div className="tw-flex tw-items-center tw-p-5 tw-space-x-2 tw-rounded-b tw-border-t tw-border-gray-200 dark:tw-border-gray-600">
                                <button
                                    type="button"
                                    className="tw-text-white tw-bg-blue-700 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={onAcceptClick}
                                >
                                    I Accept
                                </button>
                                <button
                                    type="button"
                                    className="tw-text-gray-500 tw-bg-white hover:tw-bg-gray-100 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-rounded-lg tw-border tw-border-gray-200 tw-text-sm tw-font-medium tw-px-5 tw-py-2.5 hover:tw-text-gray-900 focus:tw-z-10 dark:tw-bg-gray-700 dark:tw-text-gray-300 dark:tw-border-gray-500 dark:hover:tw-text-white dark:hover:tw-bg-gray-600 dark:focus:tw-ring-gray-600"
                                    onClick={onDeclineClick}
                                >
                                    I Decline
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
