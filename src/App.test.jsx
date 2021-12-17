import { render } from '@testing-library/react';

import App from './App';
import Page from './Page';

describe('App', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const testTitle = '';
  const testTasks = [];

  it('renders Page', () => {
    const { container } = render((
      <App />
    ));

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
});
