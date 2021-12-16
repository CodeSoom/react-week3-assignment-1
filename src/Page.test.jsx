import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const taskTitle = '';
  const tasks = [{ id: 1, title: '기상' }];

  const handleChange = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  it('task props전달시 목록에 노출되는지 확인한다.', () => {
    const { container } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChange}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );
    expect(container).toHaveTextContent('기상');
  });

  it('추가버튼 클릭시 이벤트 리스너가 작동하는지 확인한다.', () => {
    const { getByText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChange}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );

    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });

  it('완료버튼 클릭시 이벤트 리스너가 작동하는지 확인한다.', () => {
    const { getByText, getByPlaceholderText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChange}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: '일기쓰기' },
    });
    expect(handleChange).toBeCalled();

    fireEvent.click(getByText('완료'));
    expect(handleClickDeleteTask).toBeCalledWith(1);
  });
});
