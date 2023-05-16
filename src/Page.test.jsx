import { render } from '@testing-library/react';
import Page from './Page';

test('Page 렌더링이 된다.', () => {
  const tasks = [
    { id: 1, title: '뭐라도하지' },
    { id: 2, title: '그만해' },
  ];
  const { title } = tasks;
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const { container } = render(
    <Page
      taskTitle={title}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />
  );

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('뭐라도하지');
  expect(container).toHaveTextContent('완료');
});
