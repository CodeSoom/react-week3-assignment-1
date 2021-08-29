import { render, screen } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [
    {
      id: 100,
      title: 'something',
    },
  ];
  const taskTitle = 'something';

  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const renderPage = () => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      tasks={tasks}
      onClickDeleteTask={handleClickDelete}
    />));

  it('renders title', () => {
    renderPage();

    const title = screen.getByText(/to-do/i);

    expect(title).toBeInTheDocument();
  });

  it('renders Input', () => {
    renderPage();

    const input = screen.getByPlaceholderText(/할 일을 입력/);
    const addButton = screen.getByText(/추가/);

    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('renders List', () => {
    renderPage();

    const todo = screen.getByText(/something/);

    expect(todo).toBeInTheDocument();
  });
});
