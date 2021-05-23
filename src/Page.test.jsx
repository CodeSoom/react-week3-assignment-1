import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();
  const renderPage = (tasks) => render((
    <Page
      taskTitle=""
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />
  ));

  context('할 일이 없는 경우', () => {
    const tasks = [];
    it('"To-do" 타이틀을 표시한다.', () => {
      const { container } = renderPage(tasks);
      expect(container).toHaveTextContent('To-do');
    });

    it('"할 일 없어요!"를 표시한다.', () => {
      const { getByText } = renderPage(tasks);
      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('할 일이 있는 경우', () => {
    const tasks = [
      { id: 1, title: '새로운 할일 #1' },
      { id: 2, title: '새로운 할일 #2' },
      { id: 3, title: '새로운 할일 #3' },
    ];

    it('"To-do" 타이틀을 표시한다.', () => {
      const { container } = renderPage(tasks);
      expect(container).toHaveTextContent('To-do');
    });

    it('list를 표시한다.', () => {
      const { getByRole } = renderPage(tasks);
      expect(getByRole('list')).toBeInTheDocument();
    });
  });
});
