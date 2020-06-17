import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('<Page /> ', () => {
  it('할 일 목록이 없을 때 render page', () => {
    const tasks = [];
    const { getByText } = render(<Page tasks={tasks} />);
    getByText('할 일');
    getByText('할 일이 없어요!');
  });

  it('할 일 목록이 있을 때 render page', () => {
    const tasks = [
      { id: 1, title: '뭐라도 하자' },
    ];

    const { getByText, getByTestId } = render(<Page tasks={tasks} />);
    getByText('완료');
    expect(getByTestId('todo-list')).toHaveTextContent('뭐라도 하자');
  });
});
