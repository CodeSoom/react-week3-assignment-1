import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';
import { EMPTY_TASKS, TASKS } from './Fixture/Tasks';

describe('<Page /> ', () => {
  context('할 일 목록이 없으면', () => {
    it('"할 일이 없어요!" 를 보여준다.', () => {
      const { container } = render(<Page tasks={EMPTY_TASKS} />);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일 목록이 있다면 ', () => {
    it('목록을 보여준다.', () => {
      const { getAllByText, container } = render(<Page tasks={TASKS} />);

      getAllByText('완료').forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });

      TASKS.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });
  });
});
