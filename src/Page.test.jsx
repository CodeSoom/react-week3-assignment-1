import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

import tasks from '../fixtures/tasks';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

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

  it('tasks가 랜더링 되는지 확인한다', () => {
    renderPage();

    expect(screen.getByText(/넷플릭스 보기/)).not.toBeNull();
    expect(screen.getByText(/카페 가기/)).not.toBeNull();
  });

  it('추가버튼을 누르면 handleClickAddTask함수가 실행된다', () => {
    renderPage();

    fireEvent.click(screen.getByText('추가'));

    expect(handleClickAddTask).toBeCalled();
  });
});
