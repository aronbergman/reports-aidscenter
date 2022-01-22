import { DownloadOutlined } from '@ant-design/icons';
import { Button, Collapse, PageHeader, Table, Tabs } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { findDiagram } from "../../../redux/thunks/diagrams";
import { findGroupsHiv } from "../../../redux/thunks/forms";
import BarDiagram from "../../diagrams/bar";
import PieDiagram from "../../diagrams/pie";
import FiltersGroupsHivPlus from "../../filters/filters-groups-hiv-plus";
import styles from './styles.module.scss'

const { Panel } = Collapse;
const { TabPane } = Tabs;

const GroupsHivReport = () => {
    const dispatch = useDispatch();
    const selectorFiltersTesting = useSelector((state) => state.filterGroupsHiv);
    const [testing, setTesting] = useState(null)
    const [columnsForm, setColumnsForm] = useState(null)
    const filters = {
        rangePeriodStart: selectorFiltersTesting.rangePeriod && selectorFiltersTesting.rangePeriod[0].format('YYYY-MM-DD HH:mm:ss').toString(),
        rangePeriodEnd: selectorFiltersTesting.rangePeriod && selectorFiltersTesting.rangePeriod[1].format('YYYY-MM-DD HH:mm:ss').toString(),
        city: selectorFiltersTesting.city,
    }

    useEffect(() => {
        dispatch(findGroupsHiv(filters)).then((data) => {
            setTesting(data.data.sort((a, b) => b.id - a.id))
        })

        dispatch(findDiagram({ type: "groups-hiv" })).then((data) => {
            setColumnsForm([{
                code: "id",
                title: "ID анкеты",
                width: 100,
                fixed: 'left',
            }, ...data.data,])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectorFiltersTesting])

    const columns = columnsForm && columnsForm.map(column => ({
        title: column.title,
        dataIndex: column.code,
        key: column.code,
        order: column.order,
        width: column.width ? column.width : 400,
        fixed: column.fixed ? column.fixed : undefined,
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
                title="Группа ВИЧ+"
                subTitle={testing?.length &&
                <>
                    <span> <b>{testing?.length}</b>&nbsp;&nbsp;</span>
                    <Button
                        type="dashed" shape="round" icon={<DownloadOutlined/>}
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

             <FiltersGroupsHivPlus/>

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

export default GroupsHivReport;
