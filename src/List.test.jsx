import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  const renderList = (tasks) => render(<List tasks={tasks} onClickDelete={handleClick} />);

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '리액트 공부하기' },
      { id: 2, title: '블로그 작성하기' },
    ];

    it('todo list', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('리액트 공부하기');
      expect(container).toHaveTextContent('블로그 작성하기');
    });

    it('완료 buttons to delete a task', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClick).toBeCalled();
    });
  });

  context('without tasks', () => {
    const tasks = [];

    it('no task message', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
