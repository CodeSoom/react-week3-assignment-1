import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import List from './List';

describe('List', () => {
  const handleClickDeleteTask = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDeleteTask}
      />
    ));
  }

  describe('"tasks"에 값이 있을때', () => {
    const tasks = [
      {
        id: 1,
        title: '뭐라도 하기',
      },
      {
        id: 2,
        title: '코드숨 과제 하기',
      },
    ];

    it('"tasks"에 값이 보여지는지', () => {
      const { getByText } = renderList(tasks);

      expect(getByText(/뭐라도 하기/)).not.toBeNull();
      expect(getByText(/코드숨 과제 하기/)).not.toBeNull();
    });

    it('"완료" 버튼을 클릭시 지워지는지', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClickDeleteTask).toBeCalledWith(1);
    });
  });

  describe('tasks에 아무것도 없을때', () => {
    it('할 일이 없다는 문구가 나온다', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });
});
