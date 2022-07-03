import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Accordion, AccordionTab } from "primereact/accordion";

const Help = ({ auth, errors }) => {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head title="Help" />

            <div className="tw-py-12">
                <div className="tw-max-w-7xl tw-mx-auto tw-px-3 lg:tw-px-8 tw-mb-5">
                    <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm tw-rounded-lg">
                        <div className="tw-p-4 lg:tw-p-5 tw-bg-white tw-border-b tw-border-gray-200 tw-text-center tw-text-2xl">
                            Frequently Asked Questions
                        </div>
                    </div>
                </div>

                <div className="tw-max-w-7xl tw-mx-auto tw-px-3 lg:tw-px-8 tw-mb-5">
                    <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm tw-rounded-lg">
                        <div className="tw-p-4 lg:tw-p-5 tw-bg-white tw-border-b tw-border-gray-200 tw-text-center">
                            <Accordion activeIndex={0}>
                                <AccordionTab
                                    header="How do I change my password and profile details?"
                                    contentClassName="tw-text-left"
                                >
                                    - Login with your valid Tritek <br /> - Go
                                    to the profile page
                                    <br /> - Click on the edit button
                                    <br /> - Update the password or profile
                                    details as necessary
                                </AccordionTab>
                                <AccordionTab
                                    header="How do I register?"
                                    contentClassName="tw-text-left"
                                >
                                    - Click on the &#39;Register&#39; hyperlink
                                    on the login page.
                                    <br /> - Complete the mandatory fields on
                                    the registration page
                                    <br /> - Click on &#39;Register&#39; button{" "}
                                    <br />- Click on the verification link sent
                                    to your email to complete registration
                                </AccordionTab>
                                <AccordionTab
                                    header="Can I login with my personal email?"
                                    contentClassName="tw-text-left"
                                >
                                    - No, you can only register/login with a
                                    valid Tritek email
                                </AccordionTab>
                                <AccordionTab
                                    header="How do I download candidate report?"
                                    contentClassName="tw-text-left"
                                >
                                    - Search candidate activities <br />- View
                                    report/summary <br />- Click on the
                                    &#39;download&#39; button <br />- Select a
                                    format to download the report
                                </AccordionTab>
                                <AccordionTab
                                    header="What formats can I download reports in?"
                                    contentClassName="tw-text-left"
                                >
                                    - Reports can be downloaded as Excel, Html,
                                    Pdf or CSV file formats.
                                </AccordionTab>
                                <AccordionTab
                                    header="How can I search candidate activities on LMS and Basecamp?"
                                    contentClassName="tw-text-left"
                                >
                                    - Click the search &#39;Candidate&#39;
                                    button <br />- Enter the candidate name(s){" "}
                                    <br />- Select the date-from and date-to{" "}
                                    <br />- Click on the &#39;Search&#39; button
                                </AccordionTab>
                                <AccordionTab
                                    header="How can I reset my password?"
                                    contentClassName="tw-text-left"
                                >
                                    - Go to the login page - Click on the
                                    &#39;Forgot password&#39; button <br />-
                                    Enter your Tritek email address <br />-
                                    Click on the &#39;email password reset&#39;
                                    button <br />- Click on the password reset
                                    link sent to your email to create a new
                                    password
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Help;
