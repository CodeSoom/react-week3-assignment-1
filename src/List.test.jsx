import { fireEvent, render } from '@testing-library/react';

import List from './List';

import tasks from '../fixtures/tasks';

describe('List', () => {
  const handleClick = jest.fn();

  const renderList = (todoList) => render(
    <List
      tasks={todoList}
      onClickDelete={handleClick}
    />,
  );

  context('tasks가 있을 경우', () => {
    it('List 컴포넌트가 렌더링된다.', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('리액트 공부하기');
      expect(container).toHaveTextContent('블로그 작성하기');
    });

    it('완료 버튼을 누르면 handleClick 함수가 실행된다.', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClick).toBeCalled();
    });
  });

  context('tasks가 없을 경우', () => {
    const emptyTasks = [];

    it('할 일이 없어요 메시지가 보인다.', () => {
      const { container } = renderList(emptyTasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
