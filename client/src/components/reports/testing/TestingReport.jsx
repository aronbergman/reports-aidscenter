import React, { useEffect, useState } from 'react';
import { Collapse, PageHeader, Table, Tabs } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { findDiagram } from "../../../redux/thunks/diagrams";
import { findTesting } from "../../../redux/thunks/forms";
import PieDiagram from "../../diagrams/pie";
import BarDiagram from "../../diagrams/bar";
import Filters from "../../filters/filters";
import styles from './styles.module.scss'

const { Panel } = Collapse;
const { TabPane } = Tabs;

const TestingReport = () => {
    const dispatch = useDispatch();
    const selectorFiltersTesting = useSelector((state) => state.filter);
    const [testing, setTesting] = useState(null)
    const [columnsForm, setColumnsForm] = useState(null)
    const filters = {
        rangePeriodStart: selectorFiltersTesting.rangePeriod && selectorFiltersTesting.rangePeriod[0].format('M/D/YYYY HH:mm:ss').toString(),
        rangePeriodEnd: selectorFiltersTesting.rangePeriod && selectorFiltersTesting.rangePeriod[1].format('M/D/YYYY HH:mm:ss').toString(),
        usedDrugs: selectorFiltersTesting.usedDrugs,
        usedPrep: selectorFiltersTesting.usedPrep,
        sexWorked: selectorFiltersTesting.sexWorked,
        city: selectorFiltersTesting.city,
        searchByCode: selectorFiltersTesting.searchOfCode,
        formType: selectorFiltersTesting.formType,
        age: selectorFiltersTesting.age
    }

    useEffect(() => {
        dispatch(findTesting(filters)).then((data) => {
            setTesting(data.data.sort((a,b) => b.id - a.id))
        })

        dispatch(findDiagram({ type: "testing" })).then((data) => {
            setColumnsForm([{
                code: "id",
                title: "Номер тестирования"
            }, ...data.data,])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectorFiltersTesting])

    const columns = columnsForm && columnsForm.map(column => ({
        title: column.title,
        dataIndex: column.code,
        key: column.code,
        order: column.order,
        width: 400,
    }))
        .sort((a, b) => a.order - b.order);

    const comments = testing && testing.filter(i => ((i["45_consultant_comment"] || i["42_consultant"]) ? {
        "45_consultant_comment": i["45_consultant_comment"],
        "42_consultant": i["42_consultant"],
        "43_date": i["43_date"],
    } : undefined))

    return (
        <div>
            <PageHeader
                className={styles.title}
                title="Опрос тестируемых"
                subTitle={testing?.length && <span>с учётом фильтров: <b>{testing?.length}</b></span>}
            />
            <Filters/>
            <Tabs className={styles.tabs} defaultActiveKey="1">
                <TabPane tab="Статистика по вопросам" key="1">

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
                        } else if (column.type === 'table') {
                            return <Collapse>
                                <Panel header="Поиск по комментарию" key="1">
                                    <Table dataSource={
                                        comments} columns={[
                                        {
                                            title: 'Комментарий консультанта',
                                            dataIndex: '45_consultant_comment',
                                            key: '45_consultant_comment',
                                        },
                                        {
                                            title: 'Консультант',
                                            dataIndex: '42_consultant',
                                            key: '42_consultant',
                                        },
                                        {
                                            title: 'Дата',
                                            dataIndex: '43_date',
                                            key: '43_date',
                                        }
                                    ]}/>
                                </Panel>
                            </Collapse>
                        }

                    })}
                </TabPane>
                <TabPane tab="В виде таблицы" key="2">
                    <Table
                        bordered
                        layout="none"
                        size="small"
                        scroll={{ x: 'calc(6000px + 50%)', y: "100%" }}
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

export default TestingReport;
