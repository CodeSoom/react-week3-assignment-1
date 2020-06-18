import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('<Page /> ', () => {
  context('할 일 목록이 없으면', () => {
    it('할 일이 없음을 보여준다.', () => {
      const tasks = [];
      const { container } = render(<Page tasks={tasks} />);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일 목록이 있다면 ', () => {
    it('목록을 보여준다.', () => {
      const TITLE = '뭐라도 하자';
      const tasks = [
        { id: 1, title: TITLE },
      ];

      const { getByText, getByTestId } = render(<Page tasks={tasks} />);
      expect(getByText('완료')).toHaveAttribute('type', 'button');
      expect(getByTestId('todo-list')).toHaveTextContent(TITLE);
    });
  });
});
