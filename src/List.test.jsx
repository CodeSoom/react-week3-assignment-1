import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

import { EMPTY_TASKS, TASKS } from './Fixtures/Tasks';
import { EMPTY_TASK_TEXT, COMPLETE_TEXT } from './Fixtures/UserInterfaceText';

describe('<List /> ', () => {
  context('tasks가 없으면', () => {
    it('비어있을 때 메세지를 보여준다.', () => {
      const { container } = render(<List tasks={EMPTY_TASKS} />);
      expect(container).toHaveTextContent(EMPTY_TASK_TEXT);
    });
  });

  context('tasks가 있으면', () => {
    it('할 일 목록을 보여준다.', () => {
      const { container, getAllByText } = render(<List tasks={TASKS} />);
      getAllByText(COMPLETE_TEXT).forEach(
        (button) => expect(button).toHaveAttribute('type', 'button'),
      );

      TASKS.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });
  });
});
