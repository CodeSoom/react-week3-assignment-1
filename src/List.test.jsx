import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('<List /> ', () => {
  context('tasks가 없으면', () => {
    it('할 일이 없어요! 를 화면에 보여준다.', () => {
      const tasks = [];
      const { container } = render(<List tasks={tasks} />);
      expect(container).toHaveTextContent(/^할 일이 없어요!$/);
    });
  });

  context('tasks가 있으면', () => {
    it('화면에 render 한다.', () => {
      const tasks = [
        { id: 1, title: '자바스크립트 공부' },
        { id: 2, title: 'git 공부' },
        { id: 3, title: '운동하기' },
      ];

      const { container, getAllByText } = render(<List tasks={tasks} />);
      getAllByText('완료').forEach(
        (button) => expect(button).toHaveAttribute('type', 'button'),
      );

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });
  });
});
