import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
  ];

  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const { container } = render((
    <Page
      tasks={tasks}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
    />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('뭐라도 하기');
});
