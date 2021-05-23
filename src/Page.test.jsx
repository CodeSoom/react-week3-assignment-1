import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const renderPage = (taskTitle, tasks) => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  context('할 일이 없는 경우', () => {
    const taskTitle = '새로운 할일';
    const tasks = [];
    it('"To-do" 타이틀을 표시한다.', () => {
      const { container } = renderPage(taskTitle, tasks);
      expect(container).toHaveTextContent('To-do');
    });

    it('"할 일 없어요!"를 표시한다.', () => {
      const { getByText } = renderPage(taskTitle, tasks);
      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });

    it('추가 버튼 클릭 시 함수를 호출한다.', () => {
      const { getByText } = renderPage(taskTitle, tasks);
      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });

  context('할 일이 있는 경우', () => {
    const taskTitle = '';
    const tasks = [
      { id: 1, title: '새로운 할일 #1' },
      { id: 2, title: '새로운 할일 #2' },
      { id: 3, title: '새로운 할일 #3' },
    ];

    it('"To-do" 타이틀을 표시한다.', () => {
      const { container } = renderPage(taskTitle, tasks);
      expect(container).toHaveTextContent('To-do');
    });

    it('list를 표시한다.', () => {
      const { getByRole } = renderPage(taskTitle, tasks);
      expect(getByRole('list')).toBeInTheDocument();
    });

    it('추가 버튼 클릭 시 함수를 호출한다.', () => {
      const { getByText } = renderPage(taskTitle, tasks);
      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });

    it('완료 버튼 클릭 시 함수를 호출한다.', () => {
      const { getAllByText } = renderPage(taskTitle, tasks);
      const buttons = getAllByText('완료');
      fireEvent.click(buttons[0]);
      expect(handleClickDeleteTask).toBeCalled();
    });
  });
});
