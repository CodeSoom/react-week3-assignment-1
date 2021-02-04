import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {

  it('할 일이 없어요!', () => {
    const tasks = [];
  }
  
  it('놀기', () => {
    const tasks = {
      task: task,
      key: task.id,
    };
  }

  const onClickDelete = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
  expect(container).toHaveTextContent('');
});
