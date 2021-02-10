import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  const tasks = [
    { id: 1, title: 'Task-1' },
    { id: 2, title: 'Task-2' },
  ];

  it('renders task', () => {
    const { getByText } = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));

    expect(getByText(/Task-1/)).not.toBeNull();
    expect(getByText(/Task-2/)).not.toBeNull();
  });

  it('renders "완료" buttons with tasks', () => {
    const { getAllByText } = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));

    const buttons = getAllByText(/완료/);

    fireEvent.click(buttons[1]);

    expect(onClickDelete).toBeCalledWith(2);
  });
});
