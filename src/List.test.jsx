import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('tasks가 존재하지 않으면', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 보여준다.', () => {
      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('tasks가 존재한다면', () => {
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
    ];

    it('할 일 목록이 순서대로 보여준다.', () => {
      const { getAllByRole } = render((
        <List tasks={tasks} />
      ));
      const taskTitles = getAllByRole('listitem');

      taskTitles.forEach((listItem, index) => {
        expect(listItem).toHaveTextContent(tasks[index].title);
      });
    });

    it('삭제버튼을 보여준다.', () => {
      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('완료');
    });
  });
});
