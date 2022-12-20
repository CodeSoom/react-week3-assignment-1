import { render, fireEvent } from '@testing-library/react';

import List from './List';

import tasks from '../fixtures/tasks';

describe('List', () => {
  const handleClickDelete = jest.fn();

  function renderList(task) {
    return render((
      <List
        tasks={task}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('할 일이 있다면', () => {
    it('할 일이 랜더링된다', () => {
      const { getByText } = renderList(tasks);

      expect(getByText(/넷플릭스 보기/)).not.toBeNull();
      expect(getByText(/카페 가기/)).not.toBeNull();
    });

    it('할 일을 삭제하는 "완료"버튼이 랜더링된다', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClickDelete).toBeCalledWith(1);
    });
  });

  context('할 일이 없다면', () => {
    it('할 일이 없다는 문구가 랜더링된다', () => {
      const task = [];

      const { getByText } = renderList(task);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });
});
