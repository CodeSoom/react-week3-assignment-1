import { render } from '@testing-library/react';
import Page from './Page';
import TASKS from './fixtures/Task';

describe('<Page />', () => {
  const dummytasks = TASKS;
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

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

  it('title 이름인 To-do가 보인다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('To-do');
  });

  it('input이 보인다', () => {
    const { getByPlaceholderText } = renderPage();

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });

  it('"추가" button이 보인다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('추가');
  });

  context('할 일이 있다면', () => {
    it('할 일 목록 내용이 보임', () => {
      const { container } = renderPage({ tasks: dummytasks });

      dummytasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });
  });

  context('할 일이 없다면', () => {
    it('"할 일이 없어요!" 텍스트가 보임', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
