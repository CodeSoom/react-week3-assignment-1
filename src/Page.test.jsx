import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

import { TASKS, TASK_TITLE } from './stubs';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const renderPageComponent = () => render(
    <Page
      taskTitle={TASK_TITLE}
      tasks={TASKS}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      onClickDeleteTask={onClickDeleteTask}
    />,
  );

  it('To-do 헤딩 텍스트를 그려낸다', () => {
    const { container } = renderPageComponent();

    expect(container).toHaveTextContent('To-do');
  });

  it('투두 리스트를 그려낸다', () => {
    const { container } = renderPageComponent();
    expect(container).toHaveTextContent(TASKS[0].title);
    expect(container).toHaveTextContent(TASKS[1].title);
  });

  it('투두 리스트의 완료 버튼을 누르면 onClickDelete 함수가 호출된다', () => {
    const { getAllByText } = renderPageComponent();

    fireEvent.click(getAllByText('완료')[0]);
    expect(onClickDeleteTask).toHaveBeenCalledTimes(1);

    fireEvent.click(getAllByText('완료')[1]);
    expect(onClickDeleteTask).toHaveBeenCalledTimes(2);
  });

  it('투두 인풋을 그려낸다', () => {
    const { getByPlaceholderText } = renderPageComponent();

    const toDoInput = getByPlaceholderText('할 일을 입력해 주세요');
    expect(toDoInput).toBeInTheDocument();
    expect(toDoInput).toHaveValue(TASK_TITLE);
  });

  it('투두 인풋의 버튼을 클릭하면 onClickAddTask 이벤트가 호출된다', () => {
    const { getByText } = renderPageComponent();

    const addTodoButton = getByText('추가');
    addTodoButton.click();

    expect(onClickAddTask).toBeCalled();
  });

  it('투두 인풋에 타이핑을 하면 onChangeTitle 이벤트가 호출된다', () => {
    const { getByPlaceholderText } = renderPageComponent();

    const toDoInput = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(toDoInput, { target: { value: '타이핑을 해주세요' } });

    expect(onChangeTitle).toBeCalled();
  });
});
