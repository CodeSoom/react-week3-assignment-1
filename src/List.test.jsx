import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  test('Task exist', () => {
    const tasks = [
      { id: 1, title: 'Task-1' },
      { id: 2, title: 'Task-2' },
    ];

    const onClickDelete = jest.fn();

    const { getByText, getAllByText } = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));

    const buttons = getAllByText(/완료/);

    expect(getByText(/Task-1/)).not.toBeNull();
    expect(getByText(/Task-2/)).not.toBeNull();

    fireEvent.click(buttons[1]);

    expect(onClickDelete).toBeCalledWith(2);
  });
});
