import {
  fireEvent, getAllByText, render,
} from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    { id: 1, title: '아리 산책가기' },
    { id: 2, title: '공부하기' },
  ];

  const onClickDelete = jest.fn();

  const { container } = render((
    <List tasks={tasks} onClickDelete={onClickDelete} />
  ));

  tasks.forEach((task) => {
    expect(container).toHaveTextContent(task.title);
  });

  expect(onClickDelete).not.toBeCalled();

  tasks.forEach((task, index) => {
    const button = getAllByText(container, '완료')[index];
    fireEvent.click(button);
    expect(onClickDelete).toBeCalledWith(task.id);
  });
});
