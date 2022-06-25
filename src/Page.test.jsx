import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const renderPage = ({ taskTitle = '', tasks = [] } = {}) => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('To-do');
  });

  it('renders task title', () => {
    const taskTitle = '지금 할 일';
    const { getByDisplayValue } = renderPage({ taskTitle });

    expect(getByDisplayValue(taskTitle)).toBeInTheDocument();
  });

  it('listens change title event', () => {
    const { getByRole } = renderPage();

    fireEvent.change(getByRole('textbox'), { target: { value: 'a' } });

    expect(handleChangeTitle).toBeCalledTimes(1);
  });

  it('listens click add task event', () => {
    const { getByText } = renderPage();

    fireEvent.click(getByText('추가'));

    expect(handleClickAddTask).toBeCalledTimes(1);
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
      const { container } = renderPage({ tasks });

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('listens click delete task events', () => {
      const { getAllByRole } = renderPage({ tasks });

      getAllByRole('button').forEach((button) => {
        fireEvent.click(button);
      });
      expect(handleClickDeleteTask).toBeCalledTimes(tasks.length);
    });
  });
});
