import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderList = (tasks) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('tasks가 비어 있을 때', () => {
    it('빈 메시지를 표시한다', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('tasks가 있을 때', () => {
    it('할 일 목록들을 표시한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '산책하기' },
      ];

      const { getAllByRole } = renderList(tasks);
      const taskLists = getAllByRole('listitem');

      taskLists.forEach((task, index) => {
        expect(task).toHaveTextContent(tasks[index].title);
        expect(task).toHaveTextContent('완료');
      });
    });
  });

  context('완료 버튼을 클릭하면', () => {
    it('handleClickDelete()를 호출한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '산책하기' },
      ];

      const { getAllByText } = renderList(tasks);

      expect(handleClickDelete).not.toHaveBeenCalled();

      const buttons = getAllByText('완료');

      buttons.forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClickDelete).toHaveBeenCalledTimes(2);
    });
  });
});
