import React, { useCallback, useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from "./styles.module.scss";
import { Checkbox, Radio } from "antd";

Chart.register(...registerables);

const createData = (data, keyValue, multiplicity) => {

    const createMultiplicityValue = (value) => {
        const valueParse = value && parseInt(value.match(/\d+/))
        switch (multiplicity) {
            case "5":
                return (Math.ceil(valueParse / 5) * 5);
            case "10":
                return (Math.ceil(valueParse / 10) * 10);
            default:
                return value;
        }
    }

    const hash = data.map(v => createMultiplicityValue(v[keyValue]))
    const obj = {};

    hash.forEach(v => !obj[v] ? obj[v] = 1 : obj[v]++);
    const res = Object.keys(obj).map(v => [Object.assign({}, data.find(c => c[keyValue] == v)), obj[v]])
        .sort((a, b) => b[1] - a[1]);

    const labels = res.map(i => i[0][keyValue])
    const dataValues = res.map(i => i[1])

    return {
        type: 'doughnut',
        data: {
            labels,
            datasets: [
                {
                    label: "# of Votes",
                    data: dataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    datalabels: {
                        anchor: 'end'
                    }
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                height: 400,
                datalabels: {
                    backgroundColor: function (context) {
                        return context.dataset.backgroundColor;
                    },
                    borderColor: 'white',
                    borderRadius: 25,
                    borderWidth: 2,
                    color: 'white',
                    display: function (context) {
                        var dataset = context.dataset;
                        var count = dataset.data.length;
                        var value = dataset.data[context.dataIndex];
                        return value > count * 1.5;
                    },
                    formatter: function (value, ctx) {
                        let sum = ctx.dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                        // return `${(value * 100 / sum).toFixed(2) + "%"} \n(${value})`;
                        return `${(value * 100 / sum).toFixed(2) + "%"}`;
                    },
                    font: {
                        weight: 'bold'
                    },
                    padding: 6,
                },
                legend: {
                    position: 'left',
                },
            },

            // Core options
            aspectRatio: 6 / 2,
            cutoutPercentage: 32,
            layout: {
                padding: 32
            },
            elements: {
                line: {
                    fill: false
                },
                point: {
                    hoverRadius: 7,
                    radius: 5
                }
            },
        }
    };
}

const PieDiagram = ({ data, title, keyValue }) => {

    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [multiplicity, setMultiplicity] = useState("0");

    const showSelectorWithRounding = () => {
        switch (keyValue) {
            case '5_first_sex':
                return true
            default:
                return false
        }
    }

    const handleSetMultiplicity = (e) => {
        setMultiplicity(e.target.value);
    };

    const updateDataset = useCallback(() => {
        chartInstance.data = createData(data, keyValue, multiplicity).data
        chartInstance.update();
    });

    useEffect(() => {
        if (chartContainer && chartContainer.current && data && !chartInstance) {
            const newChartInstance = new Chart(chartContainer.current, createData(data, keyValue, multiplicity));
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, chartInstance, data, keyValue, multiplicity]);

    useEffect(() => {
        chartInstance && autoUpdate && updateDataset();
    }, [data, autoUpdate, multiplicity, chartInstance, updateDataset])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>

            {showSelectorWithRounding() && <Radio.Group value={multiplicity} onChange={handleSetMultiplicity}>
                <Radio.Button value="0">Без группировки</Radio.Button>
                <Radio.Button value="5">+ до кратн. 5</Radio.Button>
                <Radio.Button value="10">+ до кратн. 10</Radio.Button>
            </Radio.Group>}
            &nbsp;&nbsp;&nbsp;
            <Checkbox checked={autoUpdate} onChange={() => setAutoUpdate(!autoUpdate)}>Обновлять с изменением
                фильтра</Checkbox>
            {!autoUpdate && <button onClick={updateDataset}>обновить</button>}

            <canvas ref={chartContainer}/>
        </div>
    );
};

export default PieDiagram;
