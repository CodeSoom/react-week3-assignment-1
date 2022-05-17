import {
  fireEvent, getAllByText, render,
} from '@testing-library/react';

import List from './List';

describe('List 컴포넌트', () => {
  describe('Given : tasks가 빈 배열이고', () => {
    const tasks = [];

    const onClickDelete = jest.fn();

    test('When : 마운트 됐을 때', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={onClickDelete} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(onClickDelete).not.toBeCalled();
    });
  });

  describe('Given : tasks가 주어지고', () => {
    const tasks = [
      { id: 1, title: '아리 산책가기' },
      { id: 2, title: '공부하기' },
    ];

    const onClickDelete = jest.fn();

    test('When : 마운트 됐을 때', () => {
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
        expect(onClickDelete).toBeCalledWith(1);
      });
    });
  });
});
