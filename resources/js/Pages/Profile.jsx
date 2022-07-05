import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import ProfileAvatar from "@/Components/ProfileAvatar";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import PasswordInput from "@/Components/PasswordIInput";
import Toast from "@/Components/Toast";

const Profile = ({ auth, status, errors: propsErrors }) => {
    const { user } = auth;
    const [edit, setEdit] = React.useState(false);
    const [inputRef, setInputRef] = React.useState(null);
    const toast = React.useRef();
    const { data, setData, post, processing, errors } = useForm({
        avatar: "",
        email: user.email,
        lastname: user.name.split(" ")[1],
        firstname: user.name.split(" ")[0],
        phone: user.phone || "",
        _method: "put",
    });

    const form = useForm({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const onHandleFormChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onProfileSave = (e) => {
        e.preventDefault();
        post(route("update"), {
            onSuccess: () => {
                setEdit(false);
                handleShowAlert("Profile had been updated");
            },
        });
    };

    const onChangePaasword = (e) => {
        e.preventDefault();
        form.put(route("change-password"), {
            onError: onPasswordChangeError,
            onSuccess: () => {
                form.reset();
                handleShowAlert("Password had been updated");
                setEdit(false);
            },
        });
    };

    const onPasswordChangeError = () => {
        const ele = document.getElementById("change-password");
        ele.scrollIntoView();
    };

    const handleOnClick = () => {
        inputRef.click();
    };

    const handleShowAlert = (msg) => {
        toast.current.show(msg);
    };

    return (
        <Authenticated auth={auth} errors={propsErrors}>
            <Head title="Profile" />
            <Toast ref={toast} />

            {!edit ? (
                <div className="tw-py-12">
                    <div className="tw-max-w-3xl tw-mx-auto sm:tw-px-6 lg:tw-px-8 tw-px-5">
                        <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div className="tw-p-6 tw-bg-white tw-border-b tw-border-gray-200 ">
                                <div className="tw-py-5">
                                    <div className="lg:tw-p-5 tw-p-2">
                                        <div className="tw-pb-10">
                                            <h2 className="tw-text-center tw-font-semibold tw-text-2xl">
                                                Profile
                                            </h2>
                                        </div>
                                        <div className="tw-flex tw-flex-col tw-items-center">
                                            <ProfileAvatar
                                                source={`${
                                                    user.avatar
                                                }?${new Date().getTime()}`}
                                            />
                                        </div>
                                        <div className="tw-my-5  ">
                                            <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-4 tw-items-center ">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="firstname"
                                                        value="First Name"
                                                    />
                                                </div>
                                                <div className="">
                                                    <h2>
                                                        {
                                                            user.name.split(
                                                                " "
                                                            )[0]
                                                        }
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-4 tw-items-center ">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="lastname"
                                                        value="Last Name"
                                                    />
                                                </div>
                                                <div className="">
                                                    <h2>
                                                        {
                                                            user.name.split(
                                                                " "
                                                            )[1]
                                                        }
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-4 tw-items-center">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="email"
                                                        value="Email"
                                                    />
                                                </div>
                                                <div className="">
                                                    <h2>{user.email}</h2>
                                                </div>
                                            </div>
                                            <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-4 tw-items-center">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="phone"
                                                        value="Phone Number"
                                                    />
                                                </div>
                                                <div className="">
                                                    <h2>{user.phone}</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-items-center tw-justify-end tw-mt-4">
                                            <Button
                                                className="tw-ml-4"
                                                type="button"
                                                onClick={() => setEdit(true)}
                                            >
                                                Edit Profile
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="tw-py-12">
                    <div className="tw-max-w-3xl tw-mx-auto sm:tw-px-6 lg:tw-px-8 tw-px-5">
                        <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div className="tw-p-6 tw-bg-white tw-border-b tw-border-gray-200 ">
                                <div className="tw-py-5">
                                    <ValidationErrors errors={errors} />
                                    <form
                                        onSubmit={onProfileSave}
                                        className="lg:tw-p-5 tw-p-2"
                                    >
                                        <div className="tw-pb-10">
                                            <h2 className="tw-text-center tw-font-semibold tw-text-2xl">
                                                Profile
                                            </h2>
                                        </div>
                                        <div className="tw-flex tw-flex-col tw-items-center">
                                            <ProfileAvatar
                                                handleOnClick={handleOnClick}
                                                source={
                                                    data.avatar
                                                        ? URL.createObjectURL(
                                                              data.avatar
                                                          )
                                                        : `${
                                                              user.avatar
                                                          }?${new Date().getTime()}`
                                                }
                                                isEdit={true}
                                            />
                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                    setData(
                                                        "avatar",
                                                        e.target.files[0]
                                                    )
                                                }
                                                hidden
                                                accept="image/*"
                                                ref={(ref) => setInputRef(ref)}
                                            />
                                        </div>
                                        <div className="tw-my-5  ">
                                            <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center ">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="firstname"
                                                        value="First Name"
                                                    />
                                                </div>
                                                <div className="tw-col-span-2">
                                                    <Input
                                                        type="text"
                                                        name="firstname"
                                                        value={data.firstname}
                                                        className="tw-mt-1 tw-block tw-w-full"
                                                        autoComplete="firstname"
                                                        placeholder="First Name"
                                                        handleChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center ">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="lastname"
                                                        value="Last Name"
                                                    />
                                                </div>
                                                <div className="tw-col-span-2">
                                                    <Input
                                                        type="text"
                                                        name="lastname"
                                                        value={data.lastname}
                                                        className="tw-mt-1 tw-block tw-w-full"
                                                        autoComplete="lastname"
                                                        placeholder="Last Name"
                                                        handleChange={
                                                            onHandleChange
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="email"
                                                        value="Email"
                                                    />
                                                </div>
                                                <div className="tw-col-span-2">
                                                    <Input
                                                        type="text"
                                                        name="email"
                                                        value={data.email}
                                                        className="tw-mt-1 tw-block tw-w-full"
                                                        readOnly
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-center">
                                                <div className="tw-justify-self-end">
                                                    <Label
                                                        forInput="phone"
                                                        value="Phone Number"
                                                    />
                                                </div>
                                                <div className="tw-col-span-2">
                                                    <Input
                                                        type="text"
                                                        name="phone"
                                                        value={data.phone}
                                                        className="tw-mt-1 tw-block tw-w-full"
                                                        handleChange={
                                                            onHandleChange
                                                        }
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-items-center tw-justify-between tw-mt-4 tw-mx-4">
                                            <Button
                                                className="tw-ml-4"
                                                type="button"
                                                onClick={() => setEdit(false)}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                className="tw-ml-4"
                                                processing={processing}
                                            >
                                                Save Profile
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tw-max-w-3xl tw-mx-auto tw-m-full sm:tw-px-6 lg:tw-px-8 tw-mt-20 tw-px-5">
                        <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div className="tw-p-6 tw-bg-white tw-border-b tw-border-gray-200 ">
                                <ValidationErrors errors={form.errors} />

                                <div
                                    className="tw-my-10 tw-w-full tw-max-w-xl tw-mx-auto"
                                    id="change-password"
                                >
                                    <form onSubmit={onChangePaasword}>
                                        <div className="tw-pb-5 tw-pt-2">
                                            <h2 className="tw-text-center tw-font-semibold tw-text-2xl">
                                                Change Password
                                            </h2>
                                        </div>
                                        <div className="">
                                            <PasswordInput
                                                name="password"
                                                value={form.data.password}
                                                className="tw-mt-1 tw-block tw-w-full"
                                                autoComplete="new-password"
                                                handleChange={
                                                    onHandleFormChange
                                                }
                                                required
                                                placeholder="Current Password"
                                            />
                                        </div>

                                        <div className="tw-mt-4">
                                            <PasswordInput
                                                name="new_password"
                                                value={form.data.new_password}
                                                className="tw-mt-1 tw-block tw-w-full"
                                                autoComplete="new-password"
                                                handleChange={
                                                    onHandleFormChange
                                                }
                                                required
                                                placeholder="New Password"
                                            />
                                        </div>

                                        <div className="tw-mt-4">
                                            <PasswordInput
                                                name="new_password_confirmation"
                                                value={
                                                    form.data
                                                        .new_password_confirmation
                                                }
                                                className="tw-mt-1 tw-block tw-w-full"
                                                handleChange={
                                                    onHandleFormChange
                                                }
                                                required
                                                placeholder="Confirm New Password"
                                            />
                                        </div>

                                        <div className="tw-flex tw-items-center tw-justify-center tw-mt-4">
                                            <Button
                                                className=""
                                                processing={form.processing}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Authenticated>
    );
};

export default Profile;
