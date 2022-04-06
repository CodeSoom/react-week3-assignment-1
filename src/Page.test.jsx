import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

describe('Page 테스트', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const tasks = [
    { id: 101, title: '할 일 #101' },
    { id: 102, title: '할 일 #102' },
  ];

  it('1. 할 일 목록이 보여야 한다.', () => {
    const { container } = render((
      <Page
        taskTitle="to-do"
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(container).toHaveTextContent('할 일 #101');
    expect(container).toHaveTextContent('할 일 #102');
  });

  it('2. 완료 버튼을 클릭하면 할 일을 제거하는 함수를 실행한다.', () => {
    const { getAllByText } = render((
      <Page
        taskTitle="to-do"
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(handleClickAddTask).not.toBeCalled();
    expect(handleClickDeleteTask).not.toBeCalled();

    fireEvent.click(getAllByText('완료')[0]);
    expect(handleClickDeleteTask).toBeCalledWith(101);

    fireEvent.click(getAllByText('완료')[1]);
    expect(handleClickDeleteTask).toBeCalledWith(102);
  });
});
