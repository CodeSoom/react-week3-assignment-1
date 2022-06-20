import { useState } from 'react';

import Page from './Page';

export default function App() {
  const [state, setState] = useState({
    newId: 100,
    taskTitle: '',
    tasks: [],
  });

  const { newId, taskTitle, tasks } = state;

  const handleChangeTitle = (event) => {
    setState({
      ...state,
      taskTitle: event.target.value,
    });
  };

  const handleClickAddTask = () => {
    setState({
      ...state,
      newId: newId + 1,
      taskTitle: '',
      tasks: [...tasks, { id: newId, title: taskTitle }],
    });
  };

  const handleClickDeleteTask = (id) => {
    setState({
      ...state,
      tasks: tasks.filter((task) => task.id !== id),
    });
  };

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
