import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

import tasks from '../fixtures/tasks';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  function renderPage(taskTitle = '') {
    return render(
      (<Page
        tasks={tasks}
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />),
    );
  }

  it('Page가 렌더링된다.', () => {
    const { container, getAllByText } = renderPage();

    expect(container).toHaveTextContent('리액트 공부하기');
    expect(container).toHaveTextContent('블로그 작성하기');

    const buttons = getAllByText('완료');

    fireEvent.click(buttons[0]);
  });
});
