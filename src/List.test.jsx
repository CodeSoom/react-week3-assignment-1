import { render, fireEvent } from '@testing-library/react';

import List from './List';

// List test
// 1. without tasks
//  -renders "할 일이 없어요!" mssg
// 2. with tasks
//  -renders text
//  -renders "완료" button to remove text

describe('List', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('without tasks', () => {
    it('renders "할 일이 없어요!" mssg', () => {
      const tasks = [];
      const { container } = render(
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />,
      );

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders text', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '집에있기' },
      ];
      const { container } = render(
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />,
      );

      expect(container).toHaveTextContent('운동하기');
      expect(container).toHaveTextContent('집에있기');
      // expect(getByText('완료')).toBeInTheDocument();
    });

    it('renders "완료" button to remove text', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '집에있기' },
      ];
      const { getAllByText } = render(
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />,
      );

      const button = getAllByText('완료');
      fireEvent.click(button[0]);

      expect(handleClick).toBeCalled();
    });
  });
});
