import React from "react";

import { render } from "@testing-library/react";

import Page from "./Page";

test("Page", () => {
  const tasks = [];
  const taskTitle = "";

  const handleChangeTitle = jest.fn();
  const handleClickAddTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const { getByText } = render(
    <Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTitle}
      onClickDeleteTask={handleClickDeleteTask}
    />
  );
});
