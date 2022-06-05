import { render } from '@testing-library/react';
import { exampleTasks } from './example';
import Page from './Page';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();
  const renderApp = () => render(<Page
    taskTitle=""
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    tasks={exampleTasks}
    onClickDeleteTask={onClickDeleteTask}
  />);

  context('웹 페이지에 접속하면', () => {
    it('To-do 라는 타이틀이 보인다.', () => {
      const { container } = renderApp();
      expect(container).toHaveTextContent('To-do');
    });
  });
});
