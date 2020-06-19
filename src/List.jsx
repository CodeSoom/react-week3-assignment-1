import React from 'react';

import Item from './Item';

import { EMPTY_TASK_TEXT } from './Fixture/UserInterfaceText';

export default function List({ tasks, onClickDelete }) {
  if (tasks.length === 0) {
    return (
      <p>{EMPTY_TASK_TEXT}</p>
    );
  }

  return (
    <ol>
      {tasks.map((task) => (
        <Item key={task.id} task={task} onClickDelete={onClickDelete} />
      ))}
    </ol>
  );
}
