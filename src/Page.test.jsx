import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
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
    jest.clearAllMocks();
  });

  it('renders page title and input label', () => {
    const { container } = renderComponent({ taskTitle: '', tasks: [] });

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
  });

  context('when change text', () => {
    it('calls onChangeTitle', () => {
      const { getByRole } = renderComponent({ taskTitle: '', tasks: [] });

      fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });

      expect(handleChange).toBeCalled();
    });
  });

  context('when click add button', () => {
    it('calls onClickAddTask', () => {
      const { getByText } = renderComponent({
        taskTitle: '', tasks: [],
      });

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });

  context('when click complete button', () => {
    it('calls onClickDeleteTask', () => {
      const taskId = 1;
      const { getByText } = renderComponent({
        taskTitle: '',
        tasks: [{ id: taskId, text: '세수하기' }],
      });

      fireEvent.click(getByText('완료'));
      expect(handleClickDeleteTask).toBeCalledWith(taskId);
    });
  });
});
