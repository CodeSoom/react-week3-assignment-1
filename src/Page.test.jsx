import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [
    {
      id: 100,
      title: '테스팅 공부하기',
    },
    {
      id: 101,
      title: '코드숨 과제하기',
    },
  ];

  const taskTitle = '이번주 할 일';

  const handleClick = jest.fn();

  const {
    container,
  } = render((
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onChangeTitle={handleClick}
      onClickAddTask={handleClick}
      onClickDeleteTask={handleClick}
    />
  ));

  expect(container).toHaveTextContent('To-do');
});
