import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  function renderPage(tasks) {
    return render(<Page
      tasks={tasks}
    />);
  }

  context('With tasks', () => {
    const tasks = [
      {
        id: 1,
        title: '아무것도 하지 않기 #1',
      },
      {
        id: 2,
        title: '아무것도 하지 않기 #2',
      },
    ];

    it('shows tasks', () => {
      const { container } = renderPage(tasks);
      expect(container).toHaveTextContent('아무것도 하지 않기 #1');
      expect(container).toHaveTextContent('아무것도 하지 않기 #2');
    });
  });

  context('Without tasks', () => {
    const tasks = [];

    it('shows "no tasks message"', () => {
      const { container } = renderPage(tasks);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
