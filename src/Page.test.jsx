import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

import { EMPTY_TASKS, TASKS } from './Fixtures/Tasks';
import { EMPTY_TASK_TEXT, COMPLETE_TEXT } from './Fixtures/UserInterfaceText';

describe('<Page /> ', () => {
  context('할 일 목록이 없으면', () => {
    it('빈 메세지를 표시한다.', () => {
      const { container } = render(<Page tasks={EMPTY_TASKS} />);
      expect(container).toHaveTextContent(EMPTY_TASK_TEXT);
    });
  });

  context('할 일 목록이 있다면 ', () => {
    it('목록을 보여준다.', () => {
      const { getAllByText, container } = render(<Page tasks={TASKS} />);

      getAllByText(COMPLETE_TEXT).forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });

      TASKS.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });
  });
});
