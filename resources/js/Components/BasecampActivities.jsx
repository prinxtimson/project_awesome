import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Chart } from "primereact/chart";
import { Tooltip } from "primereact/tooltip";
import Toast from "@/Components/Toast";
import moment from "moment";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";

const reportType = [
    { name: "Table", value: "table" },
    { name: "Histogram", value: "histogram" },
    { name: "Line Chat", value: "line-chat" },
];

const TYPES = [
    { name: "Excel", value: "xlsx" },
    { name: "CSV", value: "csv" },
    { name: "PDF", value: "pdf" },
    { name: "HTML", value: "html" },
];

let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                color: "#495057",
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: "#495057",
            },
            grid: {
                color: "#ebedef",
            },
        },
        y: {
            ticks: {
                color: "#495057",
            },
            grid: {
                color: "#ebedef",
            },
        },
    },
};

export default function BasecampActivities({ result, searchDate, props }) {
    const { id, campfires, activities } = result;
    const toast = React.useRef();
    const { from, to } = searchDate;
    const [type, setType] = useState("xlsx");
    const [selectedReport, setSelectedReport] = useState("table");
    const [basicData, setBasicData] = useState({
        labels: [],
        datasets: [
            {
                label: "Campfires dataset",
                backgroundColor: "#FFA726",
                data: [],
                borderColor: "#FFA726",
            },
        ],
    });
    const [basicData2, setBasicData2] = useState({
        labels: [],
        datasets: [
            {
                label: "Check Ins dataset",
                backgroundColor: "#42A5F5",
                data: [],
                borderColor: "#42A5F5",
            },
        ],
    });

    React.useEffect(() => {
        let labels = basicData.labels;
        let datasets = basicData.datasets[0];
        let minDate = from.getTime();
        let maxDate = to.getTime();
        let startDate = minDate;
        let endDate = new Date(minDate + 7 * 24 * 60 * 60 * 1000);

        do {
            let label = `${moment(startDate).format("ll")} - ${moment(
                endDate
            ).format("ll")}`;
            let num = 0;

            campfires.map((val) => {
                let d = new Date(val.created_at).getTime();
                if (d >= startDate && d <= endDate.getTime()) {
                    num++;
                }
            });

            datasets = { ...datasets, data: [...datasets.data, num] };
            labels.push(label);

            startDate = endDate.getTime();
            endDate = new Date(endDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        } while (endDate.getTime() < maxDate);

        setBasicData({
            labels,
            datasets: [datasets],
        });
    }, [campfires]);

    React.useEffect(() => {
        let labels = basicData2.labels;
        let datasets = basicData2.datasets[0];
        let minDate = from.getTime();
        let maxDate = to.getTime();
        let startDate = minDate;
        let endDate = new Date(minDate + 7 * 24 * 60 * 60 * 1000);

        do {
            let label = `${moment(startDate).format("ll")} - ${moment(
                endDate
            ).format("ll")}`;
            let num = 0;

            activities.map((val) => {
                let d = new Date(val.created_at).getTime();
                if (d >= startDate && d <= endDate.getTime()) {
                    num++;
                }
            });

            datasets = { ...datasets, data: [...datasets.data, num] };
            labels.push(label);

            startDate = endDate.getTime();
            endDate = new Date(endDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        } while (endDate.getTime() < maxDate);

        setBasicData2({
            labels,
            datasets: [datasets],
        });
    }, [activities]);

    const onEmailClick = (e) => {
        e.preventDefault();
        axios
            .get(
                `/basecamp/email?id=${id}&from=${from.toISOString()}&to=${to.toISOString()}&type=${type}`,
                { headers: { xsrfHeaderName: props.csrf_token } }
            )
            .then((res) => toast.current.show(res.data.msg))
            .catch((err) => console.log(err));
    };

    return (
        <div className="tw-py-12">
            <Toast ref={toast} />
            <div className="tw-max-w-7xl tw-mx-auto tw-px-3 lg:tw-px-8 tw-mb-5">
                <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm tw-rounded-lg">
                    <div className="tw-p-4 lg:tw-p-5 tw-bg-white tw-border-b tw-border-gray-200 tw-text-center">
                        Basecamp Activities
                    </div>
                </div>
            </div>

            <div className="tw-max-w-7xl tw-mx-auto tw-px-3 lg:tw-px-8">
                <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm tw-rounded-lg">
                    <div className="tw-p-5 lg:tw-p-8 tw-bg-white tw-border-gray-200">
                        <div className="tw-border tw-rounded tw-px-5 tw-py-10 lg:tw-p-10">
                            <div className="tw-flex tw-justify-end tw-mb-8">
                                <div className="">
                                    <Dropdown
                                        value={selectedReport}
                                        options={reportType}
                                        onChange={(e) =>
                                            setSelectedReport(e.value)
                                        }
                                        placeholder="Select Platform"
                                        optionLabel="name"
                                        className="tw-w-52"
                                    />
                                </div>
                            </div>

                            {selectedReport === "table" ? (
                                <div className=" xl:tw-grid xl:tw-grid-cols-2 tw-gap-4">
                                    <div className="tw-w-full tw-mt-5 tw-relative">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400 tw-h-96 tw-overflow-auto block">
                                            <div className="tw-sticky tw-top-0  tw-text-center tw-p-6 tw-bg-white tw-z-50">
                                                <h2 className="">
                                                    Basecamp Campfire
                                                </h2>
                                            </div>
                                            <div className="tw-bg-white">
                                                <table className="tw-border-collapse  tw-w-full">
                                                    <thead className="tw-sticky tw-top-16 tw-bg-white">
                                                        <tr className="tw-border-b tw-border-slate-300">
                                                            <th className="tw-p-3 tw-w-4/12">
                                                                Date Range
                                                            </th>
                                                            <th className="tw-p-3 tw-w-4/12">
                                                                Post Count
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {basicData.labels.map(
                                                            (val, index) => (
                                                                <tr
                                                                    className="tw-border-b tw-border-slate-300"
                                                                    key={index}
                                                                >
                                                                    <td className="tw-p-3 ">
                                                                        {val}
                                                                    </td>
                                                                    <td className="tw-p-3  tw-text-center">
                                                                        {
                                                                            basicData
                                                                                .datasets[0]
                                                                                .data[
                                                                                index
                                                                            ]
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-w-full tw-mt-5 tw-relative">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400 tw-h-96 tw-overflow-auto block">
                                            <div className="tw-sticky tw-top-0  tw-text-center tw-p-6 tw-bg-white tw-z-50">
                                                <h2 className="">
                                                    Basecamp Check-Ins
                                                </h2>
                                            </div>
                                            <div className="tw-bg-white">
                                                <table className="tw-border-collapse  tw-w-full">
                                                    <thead className="tw-sticky tw-top-16 tw-bg-white">
                                                        <tr className="tw-border-b tw-border-slate-300">
                                                            <th className="tw-p-3 tw-w-4/12">
                                                                Date Range
                                                            </th>
                                                            <th className="tw-p-3 tw-w-4/12">
                                                                Check-In Post
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {basicData2.labels.map(
                                                            (val, index) => (
                                                                <tr
                                                                    className="tw-border-b tw-border-slate-300"
                                                                    key={index}
                                                                >
                                                                    <td className="tw-p-3 ">
                                                                        {val}
                                                                    </td>
                                                                    <td className="tw-p-3  tw-text-center">
                                                                        {
                                                                            basicData2
                                                                                .datasets[0]
                                                                                .data[
                                                                                index
                                                                            ]
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : selectedReport === "histogram" ? (
                                <div className=" xl:tw-grid xl:tw-grid-cols-2 tw-gap-4">
                                    <div className="tw-w-full tw-mt-5">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400">
                                            <div className="tw-my-4 tw-text-center tw-p-2">
                                                <h2 className="">
                                                    Basecamp Campfire
                                                </h2>
                                            </div>

                                            <div className="">
                                                <Chart
                                                    type="bar"
                                                    data={basicData}
                                                    options={basicOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-w-full tw-mt-5">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400">
                                            <div className="tw-my-4 tw-text-center tw-p-2">
                                                <h2 className="">
                                                    Basecamp Check-Ins
                                                </h2>
                                            </div>

                                            <div className="">
                                                <Chart
                                                    type="bar"
                                                    data={basicData2}
                                                    options={basicOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className=" xl:tw-grid xl:tw-grid-cols-2 tw-gap-4">
                                    <div className="tw-w-full tw-mt-5">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400">
                                            <div className="tw-my-4 tw-text-center tw-p-2">
                                                <h2 className="">
                                                    Basecamp Campfire
                                                </h2>
                                            </div>

                                            <div className="">
                                                <Chart
                                                    type="line"
                                                    data={basicData}
                                                    options={basicOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-w-full tw-mt-5">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400">
                                            <div className="tw-my-4 tw-text-center tw-p-2">
                                                <h2 className="">
                                                    Basecamp Check-Ins
                                                </h2>
                                            </div>

                                            <div className="">
                                                <Chart
                                                    type="line"
                                                    data={basicData2}
                                                    options={basicOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="tw-mt-5 tw-flex tw-items-center tw-justify-end tw-p-5">
                            <div className="tw-mx-3">
                                <Dropdown
                                    value={type}
                                    options={TYPES}
                                    onChange={(e) => setType(e.value)}
                                    placeholder="Select Ext"
                                    optionLabel="name"
                                />
                            </div>
                            <div className="">
                                <span className="tw-mx-2">
                                    <Tooltip
                                        target=".fa-download"
                                        mouseTrack
                                        mouseTrackLeft={10}
                                    />
                                    <a
                                        href={`/basecamp/download?id=${id}&from=${from.toISOString()}&to=${to.toISOString()}&type=${type}`}
                                        download
                                    >
                                        <i
                                            className="fa fa-download tw-text-3xl"
                                            data-pr-tooltip="Download"
                                        ></i>
                                    </a>
                                </span>
                                <span className="tw-mx-2">
                                    <Tooltip
                                        target=".fa-envelope "
                                        mouseTrack
                                        mouseTrackLeft={10}
                                    />
                                    <Link onClick={onEmailClick} type="button">
                                        <i
                                            className="fa fa-envelope tw-text-3xl"
                                            data-pr-tooltip="Email"
                                        ></i>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
