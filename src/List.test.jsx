import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderList = (tasks = []) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  context('tasks가 없을 때', () => {
    test('빈 메시지를 표시한다', () => {
      const { getByText } = renderList();

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('tasks가 있을 때', () => {
    test('할 일 목록과 완료 버튼을 표시한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
      ];

      const { getByText } = renderList(tasks);

      expect(getByText('운동하기')).toBeInTheDocument();
      expect(getByText('완료')).toBeInTheDocument();
    });
  });

  context('완료 버튼을 클릭하면', () => {
    test('handleClickDelete()를 호출한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
      ];

      const { getByText } = renderList(tasks);
      expect(handleClickDelete).not.toHaveBeenCalled();

      fireEvent.click(getByText('완료'));
      expect(handleClickDelete).toHaveBeenCalled();
    });
  });
});
