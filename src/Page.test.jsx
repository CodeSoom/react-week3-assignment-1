import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [
    {
      id: 1,
      title: 'Task-1',
    },
    {
      id: 2,
      title: 'Task-2',
    },
  ];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  beforeEach(() => {
    handleChangeTitle.mockClear();
    handleClickAddTask.mockClear();
    handleClickDeleteTask.mockClear();
  });

  function renderPage() {
    return render((
      <Page
        taskTitle=""
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  it('renders "추가" button to add a task', () => {
    const { getByText } = renderPage();

    expect(getByText(/Task-1/)).not.toBeNull();
    expect(getByText(/Task-2/)).not.toBeNull();

    fireEvent.click(getByText('추가'));

    expect(handleClickAddTask).toBeCalled();
  });
});
