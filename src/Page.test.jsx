import { render } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  const tasks = [
    { id: 1, taskTitle: '하기 싫어요' },
    { id: 2, taskTitle: '너무 좋아요' },
  ];
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  function renderPage(taskTitle = '') {
    return render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
  }

  it('To-do가 보인다', () => {
    const { getByRole } = renderPage();
    expect(getByRole('heading')).toHaveTextContent('To-do');
  });

  it('Input 컴포넌트가 렌더링된다.', () => {
    const { getByPlaceholderText } = renderPage();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });

  it('List 컴포넌트가 렌더링된다.', () => {
    const { getAllByRole } = renderPage(tasks);
    expect(getAllByRole('listitem')).toHaveLength(tasks.length);
  });
});
