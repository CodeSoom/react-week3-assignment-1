import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [];
  const taskTitle = '';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  test('\'To-do\'라는 타이틀을 볼 수 있다.', () => {
    const { container } = render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(container).toHaveTextContent('To-do');
  });

  test('Input 컴포넌트를 포함한다.', () => {
    const { container } = render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  test('List 컴포넌트를 포함한다.', () => {
    const { container } = render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
