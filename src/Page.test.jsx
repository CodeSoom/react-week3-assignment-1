import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

// Page
// 1. renders Page
//  -renders input
//  -renders "추가" button to add text
//  -renders text
//  -renders "완료" button to remove text

describe('Page', () => {
  const tasks = [
    { id: 1, title: '운동하기' },
    { id: 2, title: '집에있기' },
  ];
  const taskTitle = '';
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderPage = () => render(
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onClickDeleteTask={handleClick}
      onClickAddTask={handleClick}
      onChangeTitle={handleChange}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('renders Page', () => {
    it('renders input', () => {
      const { getByLabelText } = renderPage();

      fireEvent.change(getByLabelText('할 일'), {
        target: { value: '운동하기' },
      });

      expect(handleChange).toBeCalled();
    });

    it('renders "추가" button to add text', () => {
      const { getByText } = renderPage();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });

    it('renders text', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('운동하기');
      expect(container).toHaveTextContent('집에있기');
    });
  });

  it('renders "완료" button to remove text', () => {
    const { getAllByText } = renderPage();

    const button = getAllByText('완료');
    fireEvent.click(button[0]);

    expect(handleClick).toBeCalled();
  });
});
