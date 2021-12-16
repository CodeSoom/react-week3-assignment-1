import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleClickDeleteTask = jest.fn();

  const handleClickAddTask = jest.fn();

  const handleChangeTitle = jest.fn();

  const renderPage = (title, tasks) => (
    render(
      <Page
        taskTitle={title}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    )
  );

  context('without tasks', () => {
    it('renders "할 일이 없어요!"', () => {
      const title = '';
      const tasks = [];
      const { container } = renderPage(title, tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const title = '';
    const tasks = [
      {
        id: 1,
        title: '아무거나 하기',
      },
      {
        id: 2,
        title: '코드숨 강의 시청',
      },
    ];
    it('renders tasks', () => {
      const { container } = renderPage(title, tasks);

      expect(container).toHaveTextContent('아무거나 하기');
      expect(container).toHaveTextContent('코드숨 강의 시청');
    });
  });
});
