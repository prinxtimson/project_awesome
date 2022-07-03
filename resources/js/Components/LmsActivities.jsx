import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Chart } from "primereact/chart";
import { Link } from "@inertiajs/inertia-react";

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

export default function LmsActivities({ result, searchDate }) {
    const { id, campfires } = result;
    const { from, to } = searchDate;
    const [type, setType] = useState("xlsx");
    const [selectedReport, setSelectedReport] = useState("table");
    const [basicData] = useState({
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
        ],
        datasets: [
            {
                label: "My Second dataset",
                backgroundColor: "#FFA726",
                data: [28, 48, 40, 19, 86, 27, 90, 20, 30],
                borderColor: "#FFA726",
            },
        ],
    });

    return (
        <div className="tw-py-12">
            <div className="tw-max-w-7xl tw-mx-auto tw-px-3 lg:tw-px-8 tw-mb-5">
                <div className="tw-bg-white tw-overflow-hidden tw-shadow-sm tw-rounded-lg">
                    <div className="tw-p-4 lg:tw-p-5 tw-bg-white tw-border-b tw-border-gray-200 tw-text-center">
                        LMS Activities
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
                                                    LMS Completed Videos
                                                </h2>
                                            </div>
                                            <div className="tw-bg-white">
                                                <table className="tw-border-collapse tw-w-full">
                                                    <thead className="tw-sticky tw-top-16 tw-bg-white">
                                                        <tr className="tw-border-b tw-border-slate-300">
                                                            <th className="tw-p-3 tw-w-4/12 ">
                                                                Date Range
                                                            </th>
                                                            <th className="tw-p-3 tw-w-4/12">
                                                                Video Count
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

                                    <div className="tw-w-full tw-mt-5">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400 tw-bg-white tw-h-96 tw-overflow-auto block">
                                            <div className="tw-sticky tw-top-0 tw-text-center tw-p-6 tw-bg-white tw-z-50">
                                                <h2 className="">
                                                    LMS Completed Quizzes
                                                </h2>
                                            </div>
                                            <div className="tw-bg-white">
                                                <table className="tw-border-collapse  tw-w-full">
                                                    <thead className="tw-sticky tw-top-16 tw-bg-white">
                                                        <tr className="tw-border-b tw-border-slate-300">
                                                            <th className="tw-p-3 tw-w-4/12 ">
                                                                Date Range
                                                            </th>
                                                            <th className="tw-p-3 tw-w-4/12">
                                                                Quiz Count
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
                                </div>
                            ) : selectedReport === "histogram" ? (
                                <div className=" xl:tw-grid xl:tw-grid-cols-2 tw-gap-4">
                                    <div className="tw-w-full tw-mt-5">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400">
                                            <div className="tw-my-4 tw-text-center tw-p-2">
                                                <h2 className="">
                                                    LMS Completed Videos
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
                                                    LMS Completed Quizzes
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
                                </div>
                            ) : (
                                <div className=" xl:tw-grid xl:tw-grid-cols-2 tw-gap-4">
                                    <div className="tw-w-full tw-mt-5">
                                        <div className="tw-border tw-rounded-lg tw-border-slate-400">
                                            <div className="tw-my-4 tw-text-center tw-p-2">
                                                <h2 className="">
                                                    LMS Completed Videos
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
                                                    LMS Completed Quizzes
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
                                    <a
                                        href={`/basecamp/download?id=${id}&from=${from.toISOString()}&to=${to.toISOString()}&type=${type}`}
                                        download
                                    >
                                        <i className="fa fa-download text-2xl"></i>
                                    </a>
                                </span>
                                <span className="tw-mx-2">
                                    <Link
                                        href={`/basecamp/email?id=${id}&from=${from.toISOString()}&to=${to.toISOString()}&type=${type}`}
                                    >
                                        <i className="fa fa-envelope text-2xl"></i>
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
