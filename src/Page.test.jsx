import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const taskTitle = '테스크';
  const tasks = [{ id: 1, title: '너무 어렵네요' }];

  const renderPage = () => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  it('제목을 렌더링한다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('To-do');
  });

  it('input-title을 렌더링한다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('할 일');
  });

  it('input-button을 렌더링한다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('추가');
  });

  it('list-title을 렌더링한다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('너무 어렵네요');
  });

  it('list-button을 렌더링한다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('완료');
  });
});
