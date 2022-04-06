import {
  fireEvent, render, getByText,
} from '@testing-library/react';

import List from './List';

const onClickDelete = jest.fn();

describe('List', () => {
  test('no tasks', () => {
    const { container } = render((
      <List
        tasks={[]}
        onClickDelete={onClickDelete}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('tasks', () => {
    const tasks = [
      { id: 100, title: '밥먹기' },
      { id: 101, title: '테스트 코드 짜기' },
      { id: 102, title: 'PR 날리기' },
    ];

    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));

    tasks.forEach(({ id, title }) => {
      expect(container).toHaveTextContent(title);

      const item = getByText(container, title);

      const button = getByText(item, '완료');

      fireEvent.click(button);

      expect(onClickDelete).toBeCalledWith(id);
    });
  });
});
