import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

describe('Page 테스트', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  function renderPage(tasks) {
    return render((
      <Page
        taskTitle="to-do"
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  const tasks = [
    { id: 101, title: '할 일 #101' },
    { id: 102, title: '할 일 #102' },
  ];

  it('할 일 목록이 보여야 한다.', () => {
    const { container } = renderPage(tasks);

    expect(container).toHaveTextContent('할 일 #101');
    expect(container).toHaveTextContent('할 일 #102');
  });

  it('완료 버튼을 클릭하면 할 일을 제거하는 함수를 실행한다.', () => {
    const { getAllByText } = renderPage(tasks);

    expect(handleClickDeleteTask).not.toBeCalled();

    fireEvent.click(getAllByText('완료')[0]);
    expect(handleClickDeleteTask).toBeCalledWith(101);

    fireEvent.click(getAllByText('완료')[1]);
    expect(handleClickDeleteTask).toBeCalledWith(102);
  });

  it('추가 버튼을 클릭하면 할 일이 추가되어야 한다.', () => {
    const { getByText } = renderPage(tasks);

    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });

  it('할 일을 입력하면 값이 변해야 한다.', () => {
    const { getByLabelText } = renderPage(tasks);

    expect(handleChangeTitle).not.toBeCalled();
    fireEvent.change(getByLabelText('할 일'), { target: { value: '추가할 할 일' } });
    expect(handleChangeTitle).toBeCalled();
  });
});
