import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import List from './List';

describe('List', () => {
  const noHaveTasks = [];
  const haveTasks = [
    { id: 0, title: '첫 번째 할일' },
    { id: 1, title: '두 번째 할일' },
  ];
  const handleClickDelete = jest.fn();

  const renderElement = (tasks) => (
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  );

  test('task가 없을 경우, 할 일이 없어요! 문구 노출 테스트', () => {
    const { container } = render(renderElement(noHaveTasks));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('task가 있을 경우, 할 일 노출 테스트', () => {
    const { container } = render(renderElement(haveTasks));
    expect(container).toHaveTextContent('첫 번째 할일');
  });

  test('handleClickDelete 동작 테스트', () => {
    const { getAllByText } = render(renderElement(haveTasks));
    expect(handleClickDelete).not.toBeCalled();
    fireEvent.click(getAllByText('완료')[0]);
    expect(handleClickDelete).toBeCalled();

    fireEvent.click(getAllByText('완료')[1]);
    expect(handleClickDelete).toBeCalledTimes(2);
  });
});
