import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import PasswordInput from "@/Components/PasswordIInput";
import Toast from "@/Components/Toast";

export default function Login({ status, canResetPassword }) {
    const toast = React.useRef();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), { onSuccess: handleShowAlert });
    };

    const handleShowAlert = () => {
        if (status) {
            toast.current.show(status);
        }
    };

    return (
        <Guest>
            <Head title="Login" />

            <Toast ref={toast} />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit} className="tw-py-5">
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="tw-mt-4">
                    <Label forInput="password" value="Password" />

                    <PasswordInput
                        name="password"
                        value={data.password}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="tw-flex tw-mt-4 tw-justify-between">
                    <label className="tw-flex tw-items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />

                        <span className="tw-ml-2 tw-text-sm tw-text-gray-600">
                            Remember me
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900 tw-float-right"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="tw-flex tw-items-center tw-justify-end tw-mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("register")}
                            className="tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900"
                        >
                            Register
                        </Link>
                    )}

                    <Button className="tw-ml-4" processing={processing}>
                        Log in
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
