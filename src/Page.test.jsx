import { render } from '@testing-library/react';

import Page from './Page';

import TASKS from './fixtures/tasks';

describe('<Page />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const handleClickAddTask = jest.fn();

  function renderPage({ taskTitle = '', tasks = [] } = {}) {
    return render((
      <Page
        tasks={tasks}
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Input이 보인다.', () => {
    const { getByLabelText } = renderPage();

    expect(getByLabelText('할 일')).toBeInTheDocument();
  });

  context('할 일 목록이 없으면', () => {
    it('"할 일이 없어요!" 텍스트가 보인다.', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일 목록이 있으면', () => {
    it('할 일 목록의 모든 텍스트가 보인다.', () => {
      const { container } = renderPage({
        tasks: TASKS,
      });

      TASKS.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });
  });
});
