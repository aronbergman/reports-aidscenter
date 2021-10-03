import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from "./styles.module.scss";
import { Checkbox, Radio, Tag } from "antd";

Chart.register(...registerables);

const createData = (data, keyValue, arrayType, type, rounding) => {

    const createMultiplicityValue = (value) => {
        const valueParse = value && parseInt(value.match(/\d+/))

        if (keyValue === '6_sexual_partners_from_6_months') {
            switch (rounding) {
                case "0":
                    return (Math.round(valueParse / 5) * 5);
                case "1":
                    return (Math.ceil(valueParse / 5) * 5);
                case "-1":
                    return (Math.floor(valueParse / 5) * 5);
            }
        }
        return value
    }

    let hash = []
    let itemsArrayType = []
    let res

    let obj = {};

    if (arrayType) {
        hash = data.map(v => v[keyValue])
        for (let i = 0; i <= hash.length; i++) {
            if (hash[i]) {
                const a = hash[i].split(",")
                a.map(aa => itemsArrayType.push(aa.trim()))
            }
        }

        itemsArrayType.forEach(v => !obj[v] ? obj[v] = 1 : obj[v]++);
        res = Object.keys(obj).map(v => [Object.assign({}, data.find(c => {
            if (c[keyValue] && c[keyValue].includes(v)) {
                c[keyValue] = v
                return c[keyValue].includes(v)
            }
        })), obj[v]])
            .sort((a, b) => b[1] - a[1]);


    } else {
        hash = data.map(v => createMultiplicityValue(v[keyValue]))

        hash.forEach(v => !obj[v] ? obj[v] = 1 : obj[v]++);
        res = Object.keys(obj).map(v => [Object.assign({}, data.find(c => c[keyValue] == v)), obj[v]])
            .sort((a, b) => b[1] - a[1]);
    }

    const labels = res.filter(i => i[1] > 1).map(i => {
        return i[0][keyValue]
    })

    const singleValuesLabels = res.filter(i => i[1] === 1).map(i => {
        return i[0][keyValue]
    })

    const dataValues = res.filter(i => i[1] > 1).map(i => i[1])

    return {
        type: 'bar',
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
            ],
            singleValuesLabels: singleValuesLabels
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: type ? "x" : "y",
            responsive: true,
            plugins: {
                scaleShowValues: true,
                scales: {
                    y: type ? {} : {
                        ticks: {
                            autoSkip: false,
                            fontSize: 10,
                            max: 1003,
                            stepSize: 1,
                        },
                        padding: { top: 30, left: 0, right: 0, bottom: 0 }
                    },
                },
                height: 400,
                legend: false,
                // tooltip: { callbacks: { footer: footer } },
                datalabels: {
                    align: "end",
                    offset: 10
                }
            },
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

const BarDiagram = ({ data, title, keyValue, arrayType, type }) => {

    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [rounding, setRounding] = useState("0");

    const showSelectorWithRounding = () => {
        switch (keyValue) {
            case '6_sexual_partners_from_6_months':
                return true
            default:
                return false
        }
    }

    const handleSetRounding = (e) => {
        setRounding(e.target.value);
    };

    const updateDataset = () => {
        chartInstance.data = createData(data, keyValue, arrayType, type, rounding).data
        chartInstance.update();
    };

    useEffect(() => {
        if (chartContainer && chartContainer.current && data && !chartInstance) {
            const newChartInstance = new Chart(chartContainer.current, createData(data, keyValue, arrayType, type, rounding));
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, data]);

    useEffect(() => {
        chartInstance && autoUpdate && updateDataset();
    }, [data, autoUpdate, rounding])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {(keyValue === '6_sexual_partners_from_6_months') &&
            <p>округление до ближайшего числа, кратного 5 (0 = 0, 1, 2, а 5 = 3, 4, 5, 6, 7)</p>}

            {showSelectorWithRounding() && <Radio.Group value={rounding} onChange={handleSetRounding}>
                <Radio.Button value="0">округление до ближайшего</Radio.Button>
                <Radio.Button value="1">в бОльшую сторону</Radio.Button>
                <Radio.Button value="-1">в меньшую сторону</Radio.Button>
            </Radio.Group>}
            &nbsp;&nbsp;&nbsp;
            <Checkbox checked={autoUpdate} onChange={() => setAutoUpdate(!autoUpdate)}>Обновлять с изменением
                фильтра</Checkbox>
            {!autoUpdate && <button onClick={updateDataset}>обновить</button>}

            <canvas ref={chartContainer}/>
            {chartInstance && chartInstance.data.singleValuesLabels.map(i => <Tag>1️⃣&nbsp;&nbsp;{i}</Tag>)}
        </div>
    );
};

export default BarDiagram;
