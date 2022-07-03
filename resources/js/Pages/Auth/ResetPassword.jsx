import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import PasswordInput from "@/Components/PasswordIInput";
import Toast from "@/Components/Toast";

export default function ResetPassword({ token, email, status }) {
    const toast = React.useRef();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.update"), { onSuccess: handleShowAlert });
    };

    const handleShowAlert = () => {
        if (status === "verification-link-sent") {
            toast.current.show("Your password had been reset.");
        }
    };

    return (
        <Guest>
            <Head title="Reset Password" />

            <ValidationErrors errors={errors} />

            <Toast ref={toast} />

            <form onSubmit={submit} className="tw-py-5">
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="tw-mt-4">
                    <Label forInput="password" value="Password" />

                    <PasswordInput
                        name="password"
                        value={data.password}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="tw-mt-4">
                    <Label
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <PasswordInput
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="tw-flex tw-items-center tw-justify-end tw-mt-4">
                    <Button className="tw-ml-4" processing={processing}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
