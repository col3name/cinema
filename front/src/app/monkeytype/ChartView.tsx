import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import chartTrendline from "chartjs-plugin-trendline";

type ChartViewProps = {
    seconds: number;
    wpm: number[];
    raw: number[];
    errors: number[];
};

const ChartView: React.FC<ChartViewProps> = ({
    seconds,
    wpm,
    raw,
    errors,
}) => {
    const chartRef = useRef(null);
    Chart.register(...registerables);
    Chart.register(chartTrendline);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        let myChart = Chart.getChart(ctx);
        if (myChart) myChart.destroy();

        const datasets = [
            {
                type: "line",
                label: "WPM",
                tension: 0.4,
                borderColor: "#e2b714",
                data: wpm,
                // trendlineLinear: {
                //     style: "rgba(100,200,180, .8)",
                //     lineStyle: "solid",
                //     width: 1,
                //     projection: true
                // }
            },
            {
                type: "line",
                label: "Raw",
                tension: 0.4,
                data: raw,
                borderColor: "#646669"
            },
            {
                type: "line",
                label: "Errors",
                data: errors,
                tension: 0.4,
                borderColor: "#ca4754",
            },
        ];
        const number = Math.ceil( Math.ceil(seconds) / 3);
        const labels = Array( number).fill(0).map((_, idx) => `${idx + 1}`);
        myChart = new Chart(ctx, {
            data: {
                datasets: datasets,
                labels: labels,
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        myChart.update();
    }, [chartRef]);

    return (
        <div>
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
}

export default ChartView;
