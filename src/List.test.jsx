import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  const defaultText = '할 일이 없어요!';
  const errorText = '오류가 발생했습니다';
  const itemButtonText = '완료';

  const handleClickDelete = jest.fn();

  const renderList = (tasks = []) => render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '밥먹기' },
      { id: 2, title: '빨래하기' },
      { id: 3, title: '청소하기' },
    ];

    it('shows titles of tasks', () => {
      const { getByText } = renderList(tasks);

      tasks.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });
    });

    it('shows button on each task', () => {
      const { getAllByText } = renderList(tasks);

      expect(getAllByText(itemButtonText).length).toBe(tasks.length);
    });
  });

  context('with empty tasks', () => {
    const tasks = [];

    it('shows default text', () => {
      const { getByText } = renderList(tasks);

      expect(getByText(defaultText)).toBeInTheDocument();
    });
  });

  context('with invalid tasks type', () => {
    const tasks = 'invalid';

    it('shows error message', () => {
      const { getByText } = renderList(tasks);

      expect(getByText(errorText)).toBeInTheDocument();
    });
  });
});
