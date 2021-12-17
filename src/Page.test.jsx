import { render, screen } from '@testing-library/react';

import Page from './Page';

import { TASKS, TASK_TITLE } from './fixture';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const renderPageComponent = () => render(
    <Page
      taskTitle={TASK_TITLE}
      tasks={TASKS}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
    />,
  );

  it('To-do 헤딩 텍스트를 그려낸다', () => {
    const { container } = renderPageComponent();

    expect(container).toHaveTextContent('To-do');
  });

  it('투두 리스트를 그려낸다', () => {
    const { container } = renderPageComponent();

    expect(container).toHaveTextContent(TASKS[0].title);
    expect(container).toHaveTextContent(TASKS[1].title);
  });

  it('투두 인풋을 그려낸다', () => {
    renderPageComponent();

    const toDoInput = screen.getByRole('textbox');
    expect(toDoInput).toBeInTheDocument();
    expect(toDoInput).toHaveValue(TASK_TITLE);
  });
});
