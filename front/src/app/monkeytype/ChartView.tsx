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
    const chartRef = useRef<HTMLCanvasElement>(null);
    Chart.register(...registerables);
    Chart.register(chartTrendline);

    useEffect(() => {
        const ctx = chartRef.current?.getContext("2d");
        if (!ctx) {
            return;
        }
        let myChart = Chart.getChart(ctx);
        if (myChart) {
            myChart.destroy();
        }

        const datasets = [
            {
                type: "line",
                label: "WPM",
                tension: 0.4,
                borderColor: "#e2b714",
                data: wpm.splice( 2),
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
                data: raw.splice(2),
                borderColor: "#646669"
            },
            {
                type: "line",
                label: "Errors",
                data: errors.splice(2),
                tension: 0.4,
                borderColor: "#ca4754",
            },
        ];

        const getMultiplayer = (seconds: number): number => {
            if (seconds > 15) {
                return 3;
            } else if (seconds >= 30) {
                return 6;
            } else if (seconds >= 60) {
                return 8;
            } else if (seconds >= 120) {
                return 12;
            } else {
                return seconds;
            }
        }
        const getLabels = (seconds: number): string[] => {
            const multiplayer = getMultiplayer(seconds);
            const number = Math.ceil(Math.ceil(seconds) / multiplayer);
            const labels = Array(number).fill(0).map((_, idx) => `${(idx + 1) * multiplayer}`);
            return labels;
        }

        const labels = getLabels(seconds - 2);
        myChart = new Chart(ctx, {
            data: {
                // @ts-ignore
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
    }, []);

    return (
        <div>
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
}

export default ChartView;
