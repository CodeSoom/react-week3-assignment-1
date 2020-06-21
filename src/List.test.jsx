import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

describe('<List /> ', () => {
  context('할 일에 데이터가 없으면', () => {
    it('할 일이 없어요', () => {
      const tasks = [];

      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요');
    });
  });

  context('할 일에 데이터가 있으면', () => {
    it('task 표출', () => {
      const tasks = [
        { id: 1, title: 'component' },
        { id: 2, title: 'list' },
        { id: 3, title: 'test' },
      ];

      const { container } = render((
        <List tasks={tasks} />
      ));

      tasks.map((task) => (
        expect(container).toHaveTextContent(task.title)
      ));
    });
  });
});
