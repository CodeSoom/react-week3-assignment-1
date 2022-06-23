import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const setUp = ({ taskTitle = '', tasks = [] } = {}) => render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    const { container } = setUp();

    expect(container).toHaveTextContent('To-do');
  });

  it('renders task title', () => {
    const taskTitle = '지금 할 일';
    const { getByDisplayValue } = setUp({ taskTitle });

    expect(getByDisplayValue(taskTitle)).toBeInTheDocument();
  });

  it('listens change title event', () => {
    const { getByRole } = setUp();

    expect(handleChangeTitle).not.toBeCalled();
    fireEvent.change(getByRole('textbox'), { target: { value: 'a' } });
    expect(handleChangeTitle).toBeCalled();
  });

  it('listens click add task event', () => {
    const { getByText } = setUp();

    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });

  context('with tasks', () => {
    let tasks;

    beforeEach(() => {
      tasks = [
        { id: 1, title: '할 일 1' },
        { id: 2, title: '할 일 2' },
        { id: 3, title: '할 일 3' },
      ];
    });

    it('renders titles of tasks', () => {
      const { container } = setUp({ tasks });

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('listens click delete task events', () => {
      const { getAllByRole } = setUp({ tasks });

      expect(handleClickDeleteTask).not.toBeCalled();
      getAllByRole('button').forEach((button) => {
        fireEvent.click(button);
      });
      expect(handleClickDeleteTask).toBeCalledTimes(tasks.length);
    });
  });
});
