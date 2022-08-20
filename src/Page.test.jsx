import { render } from '@testing-library/react';

import Page from './Page';

describe('Page component', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const setup = ({ taskTitle = '', tasks = [] } = {}) => render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  it('renders h1', () => {
    const { getByText } = setup();

    expect(getByText('To-do')).not.toBeNull();
  });

  it('renders Input component', () => {
    const { getByPlaceholderText, getByText } = setup({ taskTitle: 'Task-example' });

    expect(getByText('추가')).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('Task-example');
  });

  context('When tasks is empty', () => {
    it('renders List component', () => {
      const { getByText } = setup();

      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });
  });

  context('When tasks exist', () => {
    const tasks = [
      {
        id: 1,
        title: 'Task-1',
      },
      {
        id: 2,
        title: 'Task-2',
      },
      {
        id: 3,
        title: 'Task-3',
      },
    ];

    it('renders List component', () => {
      const { getByText } = setup({ tasks });

      tasks.forEach((task) => {
        expect(getByText(task.title)).not.toBeNull();
      });
    });
  });
});
