import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Toast from "@/Components/Toast";

export default function VerifyEmail({ status }) {
    const toast = React.useRef();
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"), { onSuccess: handleShowAlert });
    };

    const handleShowAlert = () => {
        if (status === "verification-link-sent") {
            toast.current.show(
                "A new verification link has been sent to the email address you provided during registration."
            );
        }
    };

    return (
        <Guest>
            <Head title="Email Verification" />

            <div className="tw-mb-4 tw-text-sm tw-text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            <Toast ref={toast} />

            <form onSubmit={submit} className="tw-py-5">
                <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
                    <Button processing={processing}>
                        Resend Verification Email
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </Guest>
    );
}
