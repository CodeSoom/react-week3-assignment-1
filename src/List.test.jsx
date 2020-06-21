import React from 'react';

import { render, screen } from '@testing-library/react';

import List from './List';

describe('List 컴포넌트에', () => {
  describe('태스크가 없으면', () => {
    render(<List tasks={[]} />);

    test('"할 일이 없어요!" 를 보여준다.', () => {
      screen.getByText('할 일이 없어요!');
    });
  });

  describe('태스크가 있으면', () => {
    const todos = [
      { id: 1, title: 'hello' },
      { id: 2, title: 'world' },
    ];

    beforeEach(() => {
      render(<List tasks={todos} />);
    });

    test('태스크 리스트를 보여준다.', () => {
      screen.getByText('hello');
      screen.getByText('world');
    });
  });
});
