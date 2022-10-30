import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

import tasks from '../fixtures/tasks';

describe('<Page />', () => {
  const taskTitle = '';

  const handleDeleteTask = jest.fn();
  const handleChangeTitle = jest.fn();
  const handleAddTask = jest.fn();

  it('Page에 추가, 완료 버튼이 랜더링 된다', () => {
    const { container, getByText } = render((
      <Page
        tasks={tasks}
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleAddTask}
        onClickDeleteTask={handleDeleteTask}
      />));

    expect(container).toHaveTextContent('완료');

    fireEvent.click(getByText('추가'));

    expect(handleAddTask).toBeCalled();
  });
});
