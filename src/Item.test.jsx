import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };
  const expectedTasks = [
    { id: 2, title: 'jest 공부 하기' },
    { id: 3, title: 'mock 공부 하기' },
  ];
  const defaultTasks = [task].concat(expectedTasks);
  const state = { tasks: defaultTasks };
  const handleClickDelete = jest.fn((id) => {
    state.tasks = defaultTasks.filter((item) => item.id !== id);
  });

  beforeEach(() => {
    state.tasks = defaultTasks;
  });

  it('show task.Title & delete task button by task.id', () => {
    const { container, getByText } = render(
      <Item task={task} onClickDelete={handleClickDelete} />,
    );

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');

    expect(handleClickDelete).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClickDelete).toBeCalledWith(1);
  });
});
