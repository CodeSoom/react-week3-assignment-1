import {
  fireEvent, getAllByText, render,
} from '@testing-library/react';

import Page from './Page';

describe('Page 컴포넌트', () => {
  describe('Given : 값들이 주어지고', () => {
    const taskTitle = '뭐라도 하기';
    const tasks = [
      { id: 1, title: '아리 산책가기' },
      { id: 2, title: '공부하기' },
    ];

    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const onClickDeleteTask = jest.fn();

    test('When : 마운트 됐을 때', () => {
      const { container } = render((
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onClickAddTask={onClickAddTask}
          onClickDeleteTask={onClickDeleteTask}
          onChangeTitle={onChangeTitle}
        />
      ));

      expect(container).toHaveTextContent('To-do');

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });

      expect(onClickDeleteTask).not.toBeCalled();

      tasks.forEach((task, index) => {
        const button = getAllByText(container, '완료')[index];
        fireEvent.click(button);
        expect(onClickDeleteTask).toBeCalledWith(index + 1);
      });
    });
  });
});
