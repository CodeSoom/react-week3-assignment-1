import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  function renderPage(tasks) {
    return render((
      <Page
        tasks={tasks}
        onClickAddTask={onClickAddTask}
        onClickDeleteTask={onClickDeleteTask}
      />
    ));
  }

  it('shows subject To-do', () => {
    const tasks = [];

    const { container } = renderPage(tasks);

    expect(container).toHaveTextContent('To-do');
  });

  it('shows empty todo input and 추가 button', () => {
    const tasks = [];

    const { container } = renderPage(tasks);

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

    expect(inputTodo.value).toBe('');
    expect(container).toHaveTextContent('추가');
  });

  it('changes todo input', () => {
    const tasks = [];

    renderPage(tasks);

    const todo = '뭐라도 하기';

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputTodo, { target: { value: todo } });
    expect(inputTodo.value).toBe('뭐라도 하기');
  });

  it('adds the task', () => {
    const tasks = [];

    const { getByText } = renderPage(tasks);

    expect(onClickAddTask).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(onClickAddTask).toBeCalled();
  });

  context('with tasks', () => {
    it('shows 할 일이 없어요!', () => {
      const tasks = [];

      const { container } = renderPage(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('without tasks', () => {
    it('shows items', () => {
      const tasks = [{ id: 1, title: '뭐라도 하기' }];

      const { container } = renderPage(tasks);

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });
  });

  it('deletes the task with ID', () => {
    const tasks = [{ id: 1, title: '뭐라도 하기' }];

    const { getByText } = renderPage(tasks);

    expect(onClickDeleteTask).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(onClickDeleteTask).toBeCalledWith(1);
  });
});
