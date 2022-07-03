import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm, Link } from "@inertiajs/inertia-react";
import Toast from "@/Components/Toast";

export default function ForgotPassword({ status, canLogin }) {
    const toast = React.useRef();
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"), { onSuccess: handleShowAlert });
    };

    const handleShowAlert = () => {
        if (status) {
            toast.current.show(status);
        }
    };

    return (
        <Guest>
            <Head title="Forgot Password" />

            <div className="tw-mb-4 tw-mt-5 tw-text-sm tw-text-gray-500 tw-leading-normal">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            <Toast ref={toast} />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit} className="tw-mb-5">
                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="tw-mt-1 tw-block tw-w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <div className="tw-flex tw-items-center tw-justify-end tw-mt-4">
                    {canLogin && (
                        <Link
                            href={route("login")}
                            className="tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900"
                        >
                            Remember password?
                        </Link>
                    )}
                    <Button className="tw-ml-4" processing={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
