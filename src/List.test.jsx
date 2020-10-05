import React from 'react';
import { render, screen } from '@testing-library/react';

import List from './List';

describe('List', () => {
  test('tasks가 없을 때', () => {
    const tasks = [];
    const handleClick = jest.fn();

    render(
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />,
    );

    expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('tasks가 있을 때', () => {
    const tasks = [{
      id: 1,
      title: '복습하기',
    }];
    const handleClick = jest.fn();

    render(
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />,
    );

    expect(screen.queryByText('할 일이 없어요!')).not.toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveTextContent('복습하기');
  });
});
