import {
  fireEvent, getAllByText, render,
} from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('값들이 주어지면', () => {
    const taskTitle = '뭐라도 하기';
    const tasks = [
      { id: 1, title: '아리 산책가기' },
      { id: 2, title: '공부하기' },
    ];

    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    it('리스트와 인풋 value가 있어야한다.', () => {
      const { container } = render((
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
          onChangeTitle={handleChangeTitle}
        />
      ));

      expect(container).toHaveTextContent('To-do');

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });

      expect(handleClickDeleteTask).not.toBeCalled();

      tasks.forEach((task, index) => {
        const button = getAllByText(container, '완료')[index];
        fireEvent.click(button);
        expect(handleClickDeleteTask).toBeCalledWith(index + 1);
      });
    });
  });
});
