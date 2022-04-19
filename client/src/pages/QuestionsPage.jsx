import React, { useEffect, useState, useCallback } from "react";
import { PageHeader, Tabs } from "antd";
import { getQuestions } from "../redux/thunks/questions.thunk";
import { QuestionsTable } from "./QuestionsTable";

export const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  const reload = useCallback(() => {
    getQuestions().then((res) => setQuestions(res.data));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <>
      <PageHeader title="Вопросы" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Просмотр" key="1">
          <QuestionsTable questions={questions} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Добавить" key="2"></Tabs.TabPane>
      </Tabs>
    </>
  );
};
