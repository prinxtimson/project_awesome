import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { TabMenu } from "primereact/tabmenu";
import Label from "@/Components/Label";
import Button from "@/Components/Button";
import BasecampActivities from "@/Components/BasecampActivities";
import LmsActivities from "@/Components/LmsActivities";
import Toast from "@/Components/Toast";

const axios = window.axios;

const opts = [
    { name: "All", value: "all" },
    { name: "Basecamp", value: "basecamp" },
    { name: "LMS", value: "lms" },
];
const items = [
    {},
    { label: "Basecamp Activities", slug: "basecamp" },
    { label: "LMS Activities", slug: "lms" },
];

export default function Dashboard(props) {
    const toast = React.useRef();
    const [selectedCand, setSelectedCand] = React.useState("");
    const [date, setDate] = React.useState({
        from: "",
        to: "",
    });
    const [selectedOpt, setSelectedOpt] = React.useState("all");
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [searchResult, setSearchResult] = React.useState({
        campfires: [],
        activities: [],
        lms: [],
    });

    const handleSearch = (e) => {
        const { from, to } = date;
        if (!from || !to || !selectedCand) {
            return;
        }
        axios
            .get(
                `/api/basecamp/search?id=${
                    selectedCand.id
                }&from=${from.toISOString()}&to=${to.toISOString()}`
            )
            .then((res) => {
                // console.log(res.data);
                setSearchResult({
                    ...searchResult,
                    ...selectedCand,
                    ...res.data,
                });

                return axios.get(
                    "https://mytritek.co.uk/wp-json/my-lpa/v1/user-progress",
                    {
                        email: selectedCand.email,
                    }
                );
            })
            .then((res) => {
                let minDate = from.getTime();
                let maxDate = to.getTime();
                const lms = res.data.filter((val) => {
                    const d = new Date(val.end_time).getTime();
                    if (
                        val.status === "completed" &&
                        d >= minDate &&
                        d <= maxDate
                    ) {
                        return val;
                    }
                });

                setSearchResult({
                    ...searchResult,
                    ...selectedCand,
                    lms,
                });
            })
            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        if (props.status) {
            toast.current.show(props.status);
        }
    }, [props.status]);

    React.useEffect(() => {
        if (!selectedCand) {
            setSearchResult({
                campfires: [],
                activities: [],
                lms: [],
            });
        }
    }, [selectedCand]);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <Toast ref={toast} />
            {activeIndex ? (
                <div>
                    <TabMenu
                        model={items}
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    />
                    {activeIndex === 1 ? (
                        <BasecampActivities
                            result={searchResult}
                            searchDate={date}
                            props={props}
                        />
                    ) : (
                        activeIndex === 2 && (
                            <LmsActivities
                                result={searchResult}
                                searchDate={date}
                                props={props}
                            />
                        )
                    )}
                </div>
            ) : (
                <div className="tw-py-12">
                    <div className="tw-max-w-7xl tw-mx-auto tw-px-6 lg:tw-px-8">
                        <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm tw-rounded-lg">
                            <div className="tw-p-6 lg:tw-p-10 tw-bg-white tw-border-b tw-border-gray-200">
                                <form>
                                    <div className="sm:tw-grid sm:tw-grid-cols-5 tw-gap-4">
                                        <div className="sm:tw-col-span-2">
                                            <div className="">
                                                <Label
                                                    forInput="candidates"
                                                    value="Candidates"
                                                />
                                                <Dropdown
                                                    value={selectedCand}
                                                    options={props.people}
                                                    onChange={(e) =>
                                                        setSelectedCand(e.value)
                                                    }
                                                    optionLabel="name"
                                                    filter
                                                    showClear
                                                    filterBy="name"
                                                    placeholder="Select a Candidate"
                                                    className="tw-w-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:tw-col-span-2 tw-mt-4 sm:tw-mt-0">
                                            <div className="">
                                                <Label
                                                    forInput="dates"
                                                    value="Dates"
                                                />
                                                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                                                    <div className="">
                                                        <Calendar
                                                            value={date.from}
                                                            onChange={(e) =>
                                                                setDate({
                                                                    ...date,
                                                                    from: e.value,
                                                                })
                                                            }
                                                            showButtonBar
                                                            showIcon
                                                            placeholder="From"
                                                            className="tw-w-full"
                                                            maxDate={new Date()}
                                                        ></Calendar>
                                                    </div>

                                                    <div className="">
                                                        <Calendar
                                                            value={date.to}
                                                            onChange={(e) =>
                                                                setDate({
                                                                    ...date,
                                                                    to: e.value,
                                                                })
                                                            }
                                                            showButtonBar
                                                            showIcon
                                                            placeholder="To"
                                                            className="tw-w-full"
                                                            maxDate={new Date()}
                                                            minDate={date.from}
                                                        ></Calendar>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:tw-col-span-1 tw-mt-4 sm:tw-mt-0">
                                            <div className="">
                                                <Label
                                                    forInput="platform"
                                                    value="Platform"
                                                />
                                                <Dropdown
                                                    value={selectedOpt}
                                                    options={opts}
                                                    onChange={(e) =>
                                                        setSelectedOpt(e.value)
                                                    }
                                                    placeholder="Select Platform"
                                                    optionLabel="name"
                                                    className="tw-w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tw-flex tw-items-center tw-justify-center tw-mt-5 ">
                                        <div className="tw-w-full lg:tw-w-96">
                                            <Button
                                                className="tw-w-full"
                                                type="button"
                                                onClick={handleSearch}
                                            >
                                                Search
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {searchResult.id && (
                            <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm tw-rounded-lg tw-mt-10">
                                <div className="tw-p-6 lg:tw-p-10 tw-bg-white tw-border-b tw-border-gray-200 tw-flex tw-items-center tw-flex-col tw-justify-center">
                                    <div className="tw-pt-10 tw-pb-10">
                                        <h2 className="tw-text-5xl">
                                            Search Results
                                        </h2>
                                    </div>
                                    <div className="tw-pb-6">
                                        <h3 className="tw-text-3xl ">
                                            {searchResult.name}
                                        </h3>
                                    </div>
                                    <div className="tw-w-full">
                                        {(selectedOpt === "all" ||
                                            selectedOpt === "basecamp") && (
                                            <div className="tw-border tw-rounded tw-p-8 tw-flex tw-items-center tw-flex-col tw-justify-center">
                                                <div className="tw-mb-5">
                                                    <div className=" ">
                                                        <Button
                                                            onClick={() =>
                                                                setActiveIndex(
                                                                    1
                                                                )
                                                            }
                                                            className="tw-w-full"
                                                        >
                                                            Basecamp Activities
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="lg:tw-w-96 tw-w-full">
                                                    <div className="">
                                                        <table className="tw-border-collapse tw-border tw-border-slate-400 lg:tw-w-96 tw-w-full">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="tw-border tw-border-slate-300 lg:tw-w-96 tw-p-3 tw-w-full tw-text-center">
                                                                        {`(${searchResult.campfires.length}) Total Number
                                                                    of Basecamp
                                                                    Campfire
                                                                    posts`}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="tw-border tw-border-slate-300 lg:tw-w-96 lg:tw-p-3 tw-w-full tw-p-3 tw-text-center">
                                                                        {`(${searchResult.activities.length}) Total
                                                                        Number
                                                                        of
                                                                        Basecamp
                                                                        Check
                                                                        ins`}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {(selectedOpt === "all" ||
                                            selectedOpt === "lms") && (
                                            <div className="tw-border tw-rounded tw-p-8 tw-mt-10 tw-flex tw-items-center tw-flex-col tw-justify-center">
                                                <div className="tw-mb-5">
                                                    <div className="">
                                                        <Button
                                                            onClick={() =>
                                                                setActiveIndex(
                                                                    2
                                                                )
                                                            }
                                                            className="tw-w-full"
                                                        >
                                                            LMS Activities
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="lg:tw-w-96 tw-w-full">
                                                    <div className="">
                                                        <table className="tw-border-collapse tw-border tw-border-slate-400 lg:tw-w-96 tw-w-full">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="tw-border tw-border-slate-300 lg:tw-w-96 tw-p-3 tw-w-full tw-text-center">
                                                                        {`(${
                                                                            searchResult.lms.filter(
                                                                                (
                                                                                    val
                                                                                ) =>
                                                                                    val.item_type ===
                                                                                    "lp_lesson"
                                                                            )
                                                                                .length
                                                                        }) Total Number of
                                                                LMS completed
                                                                Videos watched`}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="tw-border tw-border-slate-300 lg:tw-w-96 tw-p-3 tw-w-full tw-text-center">
                                                                        {`(${
                                                                            searchResult.lms.filter(
                                                                                (
                                                                                    val
                                                                                ) =>
                                                                                    val.item_type ===
                                                                                    "lp_quiz"
                                                                            )
                                                                                .length
                                                                        }) Total
                                                                        Number
                                                                        of LMS
                                                                        completed
                                                                        Quizzes`}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Authenticated>
    );
}
