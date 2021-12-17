import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('App', () => {
  const handleChange = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const renderComponent = ({ taskTitle, tasks }) => render(
    <Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  beforeEach(() => {
    handleChange.mockClear();
    handleClickAddTask.mockClear();
    handleClickDeleteTask.mockClear();
  });

  it('renders title', () => {
    const { container } = renderComponent({ taskTitle: '', tasks: [] });

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
  });

  it('calls handleChange', () => {
    const { getByRole } = renderComponent({ taskTitle: '', tasks: [] });

    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });

    expect(handleChange).toBeCalled();
  });

  it('calls handleClickAddTask', () => {
    const { getByText } = renderComponent({
      taskTitle: '', tasks: [],
    });

    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });

  it('calls handleClickDeleteTask ', () => {
    const taskId = 1;
    const { getByText } = renderComponent({
      taskTitle: '',
      tasks: [{ id: taskId, text: '세수하기' }],
    });

    expect(handleClickDeleteTask).not.toBeCalled();

    fireEvent.click(getByText('완료'));
    expect(handleClickDeleteTask).toBeCalledWith(taskId);
  });
});
