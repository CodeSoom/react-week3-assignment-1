import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page component', () => {
  const taskTitle = '할 일1';
  const tasks = [{
    id: 2,
    title: '할 일2',
  }];
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();
  const handleChange = jest.fn();

  it('has title, input, list component', () => {
    const { getByText, getByPlaceholderText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChange}
        onClickAddTask={handleClickAdd}
        tasks={tasks}
        onClickDeleteTask={handleClickDelete}
      />,
    );

    getByText('To-do');

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: taskTitle,
      },
    });
    expect(input).toHaveAttribute('value', '할 일1');

    getByText('할 일2');
    expect(tasks[0]).toMatchObject({
      id: 2,
      title: '할 일2',
    });
  });
});
