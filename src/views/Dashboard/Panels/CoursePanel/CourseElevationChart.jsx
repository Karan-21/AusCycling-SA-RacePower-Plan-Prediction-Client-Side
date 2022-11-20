import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CourseElevationChart = ({ courseCumDistKm, courseElev, setCurMousePos }) => {
    const options = {
        accessibility: {
            enabled: false,
        },
        chart: {
            type: "line",
            height: "250px",
            zoomType: "x",
        },
        title: { text: "" },
        legend: { enabled: false },
        credits: {
            enabled: false,
        },
        xAxis: {
            title: { text: "" },
            tickInterval: 250,
            categories: courseCumDistKm,
            labels: {
                formatter: x => `${Math.floor(x.value)} km`,
            },
        },
        yAxis: {
            title: { text: "" },
            labels: {
                formatter: y => `${y.value} m`,
            },
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return `<span>Distance: ${this.x.toFixed(
                    2
                )} km<br/>Altitude: ${this.y.toFixed(2)} m<span>`;
            },
        },
        series: [
            {
                name: "Altitude",
                data: courseElev,
            },
        ],
        plotOptions: {
            series: {
                stickyTracking: false,
                point: {
                    events: {
                        mouseOver: function () {
                            setCurMousePos(this.x);
                        },
                    },
                },
            },
        },
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CourseElevationChart;
