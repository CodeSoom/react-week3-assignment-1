import React from 'react';

import { render } from '@testing-library/react';
import context from 'jest-plugin-context';

import List from './List';

describe('List', () => {
  const renderList = (tasks = []) => render(
    <List
      tasks={tasks}
    />,
  );

  context('task가 있을 때', () => {
    const tasks = [
      { id: 1, title: '책읽기' },
      { id: 2, title: '부동산공부' },
    ];

    it('컴포넌트 랜딩 시, tasks 목록을 출력한다.', () => {
      const { getByText } = renderList(tasks);

      tasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });
  });

  context('tasks가 없을 때', () => {
    it('컴포넌트 랜딩 시, 빈 메시지를 출력합니다.', () => {
      const { getByText } = renderList();

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });
});
