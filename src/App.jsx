import { useState } from 'react';

import Page from './Page';
import tasksDefault from './tasks';

// 협력 구현 - 종류중의 하나 짝 프로그래밍
// 3분씩 번갈아가면서 프로그래밍

export default function App() {
  const [state, setState] = useState({
    newId: 100,
    taskTitle: '',
    tasks: tasksDefault,
  });

  const { newId, taskTitle, tasks } = state;

  function handleChangeTitle(event) {
    setState({
      ...state,
      taskTitle: event.target.value,
    });
  }

  function handleClickAddTask() {
    setState({
      ...state,
      newId: newId + 1,
      taskTitle: '',
      tasks: [...tasks, { id: newId, title: taskTitle }],
    });
  }

  function handleClickDeleteTask(id) {
    setState({
      ...state,
      tasks: tasks.filter((task) => task.id !== id),
    });
  }

  return (
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  );
}
