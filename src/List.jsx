import React from 'react';

import Item from './Item';

export default function List({ tasks, onClickDelete }) {
  if (!Array.isArray(tasks)) {
    return (
      <p>오류가 발생했습니다</p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p>할 일이 없어요!</p>
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
