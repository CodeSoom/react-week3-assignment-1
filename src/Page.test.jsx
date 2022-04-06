import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const taskList = [{
    id: 1,
    title: '뭐라도 하기',
  }, {
    id: 2,
    title: '맛있는 음식 먹기',
  }];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  function renderPage({ taskTitle, tasks }) {
    return render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with tasks', () => {
    it('renders header and tasks', () => {
      const { container } = renderPage({ taskTitle: '공부하', tasks: taskList });

      expect(container).toHaveTextContent('To-do');

      taskList.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });

    it('calls handleChangeTitle', () => {
      const { getByRole } = renderPage({ taskTitle: '공부하', tasks: taskList });

      fireEvent.change(getByRole('textbox'), { target: { value: '공부하기' } });

      expect(handleChangeTitle).toBeCalled();
    });

    it('calls handleClickAddTask', () => {
      const { getByText } = renderPage({ taskTitle: '공부하기', tasks: taskList });

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
    });

    it('calls handleClickDeleteTask', () => {
      const { getAllByText } = renderPage({ taskTitle: '', tasks: taskList });

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDeleteTask).toBeCalledWith(1);
    });
  });

  context('without task', () => {
    it('renders header and message `할 일이 없어요!`', () => {
      const { container } = renderPage({ taskTitle: '공부하', tasks: [] });

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('calls handleChangeTitle', () => {
      const { getByRole } = renderPage({ taskTitle: '공부하', tasks: [] });

      fireEvent.change(getByRole('textbox'), { target: { value: '공부하기' } });

      expect(handleChangeTitle).toBeCalled();
    });

    it('calls handleClickAddTask', () => {
      const { getByText } = renderPage({ taskTitle: '공부하기', tasks: [] });

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
    });
  });
});
