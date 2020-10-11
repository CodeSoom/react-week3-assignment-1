import React from 'react';

import Item from './Item';

import testId from './componentTestID';

export default function List({ tasks, onClickDelete }) {
  if (tasks.length === 0) {
    return (
      <p data-testd={testId.List}>할 일이 없어요!</p>
    );
  }

  return (
    <ol data-testid={testId.List}>
      {tasks.map((task) => (
        <Item key={task.id} task={task} onClickDelete={onClickDelete} />
      ))}
    </ol>
  );
}
