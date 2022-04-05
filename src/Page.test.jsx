import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  }, {
    id: 2,
    title: '맛있는 음식 먹기',
  }];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with tasks', () => {
    it('renders header and tasks', () => {
      const { container } = render((
        <Page
          taskTitle="공부하"
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(container).toHaveTextContent('To-do');

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });

    context('when the input is changed', () => {
      it('calls handleChangeTitle', () => {
        const { getByRole } = render((
          <Page
            taskTitle="공부하"
            onChangeTitle={handleChangeTitle}
            onClickAddTask={handleClickAddTask}
            tasks={tasks}
            onClickDeleteTask={handleClickDeleteTask}
          />
        ));

        fireEvent.change(getByRole('textbox'), { target: { value: '공부하기' } });

        expect(handleChangeTitle).toBeCalled();
      });
    });

    context('when a task is added', () => {
      it('calls handleClickAddTask', () => {
        const { getByText } = render((
          <Page
            taskTitle="공부하기"
            onChangeTitle={handleChangeTitle}
            onClickAddTask={handleClickAddTask}
            tasks={tasks}
            onClickDeleteTask={handleClickDeleteTask}
          />
        ));

        fireEvent.click(getByText('추가'));

        expect(handleClickAddTask).toBeCalled();
      });
    });

    context('when the done button is clicked', () => {
      it('calls handleClickDeleteTask', () => {
        const { getAllByText } = render((
          <Page
            taskTitle="공부하"
            onChangeTitle={handleChangeTitle}
            onClickAddTask={handleClickAddTask}
            tasks={tasks}
            onClickDeleteTask={handleClickDeleteTask}
          />
        ));

        fireEvent.click(getAllByText('완료')[0]);

        expect(handleClickDeleteTask).toBeCalledWith(1);
      });
    });
  });

  context('with no task', () => {
    it('renders header and message `할 일이 없어요!`', () => {
      const { container } = render((
        <Page
          taskTitle="공부하"
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={[]}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    context('when the input is changed', () => {
      it('calls handleChangeTitle', () => {
        const { getByRole } = render((
          <Page
            taskTitle="공부하"
            onChangeTitle={handleChangeTitle}
            onClickAddTask={handleClickAddTask}
            tasks={[]}
            onClickDeleteTask={handleClickDeleteTask}
          />
        ));

        fireEvent.change(getByRole('textbox'), { target: { value: '공부하기' } });

        expect(handleChangeTitle).toBeCalled();
      });
    });

    context('when a task is added', () => {
      it('calls handleClickAddTask', () => {
        const { getByText } = render((
          <Page
            taskTitle="공부하기"
            onChangeTitle={handleChangeTitle}
            onClickAddTask={handleClickAddTask}
            tasks={[]}
            onClickDeleteTask={handleClickDeleteTask}
          />
        ));

        fireEvent.click(getByText('추가'));

        expect(handleClickAddTask).toBeCalled();
      });
    });
  });
});
