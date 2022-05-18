import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderTaskList = (tasks) => (
    render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ))
  );

  context('할 일이 없을 떄', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderTaskList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있을때', () => {
    const tasks = [
      { id: 1, title: '아무거나 추가하기' },
    ];

    it('할 일 목록을 표시한다.', () => {
      const { container } = renderTaskList(tasks);

      expect(container).toHaveTextContent('아무거나 추가하기');
      expect(container).toHaveTextContent('완료');
    });

    it('handleClickDelete 함수를 호출한다.', () => {
      const { getByText } = renderTaskList(tasks);

      expect(handleClickDelete).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(handleClickDelete).toBeCalledWith(1);
    });
  });
});
