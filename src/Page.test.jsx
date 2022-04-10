import { fireEvent, render } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  const tasks = [
    {
      id: 1,
      title: '배고파요',
    },
    {
      id: 2,
      title: '치킨을 먹어요',
    },
    {
      id: 3,
      title: '피자를 먹어요',
    },
  ];

  const taskTitle = 'hello';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  function renderPage(newTasks = tasks) {
    return render((
      <Page
        taskTitle={taskTitle}
        tasks={newTasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('1. To-do 출력', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('To-do');
  });

  context('2. 할일 있을 때', () => {
    it('2-1. 할일 리스트 출력', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('배고파요');
      expect(container).toHaveTextContent('치킨을 먹어요');
      expect(container).toHaveTextContent('피자를 먹어요');
    });

    it("2-2. '완료' 버튼 출력", () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('완료');
    });

    it("2-3. '완료' 버튼 클릭", () => {
      const { getAllByText } = renderPage();

      expect(handleClickDeleteTask).not.toBeCalled();

      fireEvent.click(getAllByText('완료')[0]);
      expect(handleClickDeleteTask).toBeCalledWith(1);

      fireEvent.click(getAllByText('완료')[1]);
      expect(handleClickDeleteTask).toBeCalledWith(2);

      fireEvent.click(getAllByText('완료')[2]);
      expect(handleClickDeleteTask).toBeCalledWith(3);
    });
  });

  context('3. 할일 없을 때', () => {
    it("3-1. 빈 배열일 때 '할 일이 없어요!' 출력", () => {
      const { container } = renderPage([]);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
