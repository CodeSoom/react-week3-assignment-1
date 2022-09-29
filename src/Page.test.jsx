import { render } from '@testing-library/react';

import Page from './Page';

test('PageTest', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기1',
  },
  {
    id: 2,
    title: '뭐라도 하기2',
  },
  {
    id: 3,
    title: '뭐라도 하기3',
  },
  ];
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();
  const title = 'abcdefg';

  const { container } = render((
    <Page
      taskTitle={title}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDelete={onClickDeleteTask}
    />
  ));
  expect(container).toHaveTextContent('To-do');
});
