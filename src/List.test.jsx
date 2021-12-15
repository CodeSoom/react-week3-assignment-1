import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderList = (tasks) => (
    render(
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />,
    )
  );

  context('without tassk', () => {
    it('without tasks', () => {
      const tasks = [];
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [
      {
        id: 1,
        title: '아무거나 하기',
      },
      {
        id: 2,
        title: '코드숨 강의 시청',
      },
    ];
    it('render tasks', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('아무거나 하기');
      expect(container).toHaveTextContent('코드숨 강의 시청');
    });

    it('"완료" buttons to delete a task', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      expect(handleClickDelete).not.toBeCalled();
      fireEvent.click(buttons[0]);
      expect(handleClickDelete).toBeCalledWith(1);
    });
  });
});
