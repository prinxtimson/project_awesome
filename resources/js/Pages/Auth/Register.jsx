import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import PasswordInput from "@/Components/PasswordIInput";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
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

        post(route("register"));
    };

    return (
        <Guest>
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit} className="tw-py-5">
                <div>
                    <Label forInput="firstname" value="First Name" />

                    <Input
                        type="text"
                        name="firstname"
                        value={data.firstname}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="firstname"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="tw-mt-4">
                    <Label forInput="lastname" value="Last Name" />

                    <Input
                        type="text"
                        name="lastname"
                        value={data.lastname}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="lastname"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="tw-mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="tw-mt-4">
                    <Label forInput="password" value="Password" />

                    <PasswordInput
                        name="password"
                        value={data.password}
                        className="tw-mt-1 tw-block tw-w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
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
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="tw-flex tw-items-center tw-justify-end tw-mt-4">
                    <Link
                        href={route("login")}
                        className="tw-underline tw-text-sm tw-text-gray-600 hover:tw-text-gray-900"
                    >
                        Login
                    </Link>

                    <Button className="tw-ml-4" processing={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
