import React, { useEffect, useState } from 'react';
import { Button, Collapse, PageHeader, Table, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Excel } from 'antd-table-saveas-excel';
import { useDispatch, useSelector } from "react-redux";
import { findDiagram } from "../../../redux/thunks/diagrams";
import { findHotLine } from "../../../redux/thunks/forms";
import PieDiagram from "../../diagrams/pie";
import BarDiagram from "../../diagrams/bar";
import Filters from "../../filters/filters";
import styles from './styles.module.scss'

const { Panel } = Collapse;
const { TabPane } = Tabs;

const HotLineReport = () => {
    const dispatch = useDispatch();
    const selectorFiltersTesting = useSelector((state) => state.filter);
    const [testing, setTesting] = useState(null)
    const [columnsForm, setColumnsForm] = useState(null)
    // const filters = {
    //     rangePeriodStart: selectorFiltersTesting.rangePeriod && selectorFiltersTesting.rangePeriod[0].format('M/D/YYYY HH:mm:ss').toString(),
    //     rangePeriodEnd: selectorFiltersTesting.rangePeriod && selectorFiltersTesting.rangePeriod[1].format('M/D/YYYY HH:mm:ss').toString(),
    //     usedDrugs: selectorFiltersTesting.usedDrugs,
    //     usedPrep: selectorFiltersTesting.usedPrep,
    //     sexWorked: selectorFiltersTesting.sexWorked,
    //     city: selectorFiltersTesting.city,
    //     searchByCode: selectorFiltersTesting.searchOfCode,
    //     formType: selectorFiltersTesting.formType,
    //     age: selectorFiltersTesting.age,
    //     searchType: selectorFiltersTesting.searchType,
    // }

    useEffect(() => {
        dispatch(findHotLine()).then((data) => {
            setTesting(data.data.sort((a, b) => b.id - a.id))
        })

        // dispatch(findDiagram({ type: "testing" })).then((data) => {
        //     setColumnsForm([{
        //         code: "id",
        //         title: "ID анкеты",
        //         width: 100,
        //         fixed: 'left',
        //     }, ...data.data,])
        // })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectorFiltersTesting])

    const columns = [
        {title: "Город", dataIndex: '1_city',},
        {title: "Консультант", dataIndex: '2_consultant',},
        {title: "3_source_of_appeal", dataIndex: '3_source_of_appeal',},
        {title: "4_date", dataIndex: '4_date',},
        {title: "5_reason_for_petition", dataIndex: '5_reason_for_petition',},
        {title: "6_consultation_results", dataIndex: '6_consultation_results',},
        {title: "7_consulting_on_regular_testing_provided", dataIndex: '7_consulting_on_regular_testing_provided',},
        {title: "8_prevention_counseling_provided", dataIndex: '8_prevention_counseling_provided',},
        {title: "9_provided_counseling_on_receiving_treatment_for_hiv", dataIndex: '9_provided_counseling_on_receiving_treatment_for_hiv',},
        {title: "10_consultant_comment", dataIndex: '10_consultant_comment',},
    ]

    return (
        <div>
            <PageHeader
                className={styles.title}
                title="Горячая линия"
                subTitle={testing?.length &&
                <>
                    <span>с учётом фильтров: <b>{testing?.length}</b>&nbsp;&nbsp;</span>
                    <Button
                        type="primary" shape="round" icon={<DownloadOutlined/>}
                        onClick={() => {
                            const today = new Date()
                            const excel = new Excel();
                            excel
                                .addSheet('Опрос тестируемых')
                                .addColumns(columns)
                                .addDataSource(testing)
                                .saveAs(`Опрос тестируемых ${today}.xlsx`);
                        }}>Скачать Excel</Button>
                </>
                }
            />

            {/*<Filters />*/}

            <Tabs className={styles.tabs} defaultActiveKey="2">
                <TabPane tab="Статистика" key="1">
                    {columnsForm && columnsForm.map(column => {
                        if (column.type === 'pie') {
                            return <PieDiagram
                                title={column.title}
                                keyValue={column.code}
                                data={testing}
                            />
                        } else if (column.type && column.type.includes("bar")) {
                            return <BarDiagram
                                title={column.title}
                                keyValue={column.code}
                                type={column.type.includes("x")}
                                data={testing}
                                arrayType={columnsForm.find(i => i.code === column.code)["arrayType"]}
                            />
                        }

                    })}
                </TabPane>
                <TabPane tab="В виде таблицы" key="2">
                    <Table
                        bordered
                        layout="none"
                        size="small"
                        scroll={{ x: "100%", y: "100%" }}
                        columns={columns}
                        dataSource={testing}
                        tableLayout="auto"
                        top="none"
                        bottom="bottomRight"
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default HotLineReport;
