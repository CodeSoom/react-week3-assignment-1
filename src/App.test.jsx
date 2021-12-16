import { render } from '@testing-library/react';

import App from './App';
import Page from './Page';

test('App', () => {
  const { container } = render((
    <App />
  ));

  // 매개변수가 전혀 없는 App은 어떻게 테스트 해야할까?
  // => Page가 생겨난다?
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const testTitle = '';
  const testTasks = [];

  const { container: pageContainer } = render((
    <Page
      taskTitle={testTitle}
      onChangeTitle={handleChangeTitle}
      onClickDeleteTask={handleClickDeleteTask}
      onClickAddTask={handleClickAddTask}
      tasks={testTasks}
    />
  ));

  expect(container).toEqual(pageContainer);
});
