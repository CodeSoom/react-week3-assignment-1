import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  test('tasks에 값이 없는 경우 검사', () => {
    const tasks = [];
    const handleDelete = jest.fn();
    const { container } = render(
      <List
        tasks={tasks}
        onClickDelete={handleDelete}
      />,
    );

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('tasks에 값이 있는 경우 검사', () => {
    const tasks = [
      {
        id: 100,
        title: '통과하지 못하는 테스트 작성(RED)',
      },
      {
        id: 101,
        title: '테스트를 통과하는 코드 작성(GREEN)',
      },
      {
        id: 102,
        title: '결과 코드를 깔끔하게 리팩터링(REFACTORING)',
      },
    ];
    const handleDelete = jest.fn();
    const { container } = render(
      <List
        tasks={tasks}
        onClickDelete={handleDelete}
      />,
    );

    tasks.forEach((task) => {
      expect(container).toHaveTextContent(task.title);
      expect(container).toHaveTextContent('완료');
    });
  });

  test('handleDelete 이벤트 검사', () => {
    const tasks = [
      {
        id: 100,
        title: 'handleDelete 이벤트',
      },
    ];
    const handleDelete = jest.fn();
    const { getByText } = render(
      <List
        tasks={tasks}
        onClickDelete={handleDelete}
      />,
    );
    const button = getByText('완료');

    expect(handleDelete).not.toBeCalled();
    fireEvent.click(button);
    expect(handleDelete).toBeCalled();
  });
});
