import { render } from '@testing-library/react';

import Page from './Page';

test('Page test!', () => {
  const taskTitle = '페이지 테스트하기';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const tasks = [
    {
      id: 1,
      title: '뭐라도 해보기.',
    },
    {
      id: 2,
      title: '두번째 할일',
    },
  ];
  const onClickDeleteTask = jest.fn();

  const { container } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />
  ));
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('뭐라도 해보기.');
  expect(container).toHaveTextContent('두번째 할일');
});
