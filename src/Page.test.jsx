import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  // events
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  // elements
  const renderElement = (taskTitle, tasks) => render(
    <Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  beforeEach(() => jest.clearAllMocks());

  context('1. taskTitle을 입력하면', () => {
    it('taskTitle을 렌더링한다', () => {
      const { getByPlaceholderText } = renderElement('할일!', []);
      const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
      expect(inputElement.value).toBe('할일!');
    });

    it('handleChange가 실행된다', () => {
      const { getByPlaceholderText } = renderElement('할일!', []);
      const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
      expect(handleChangeTitle).not.toBeCalled();
      fireEvent.change(inputElement, { target: { value: '할일 테스트!' } });
      expect(handleChangeTitle).toBeCalled();
    });
  });

  context('2-1. tasks가 없는 경우.', () => {
    // props
    const noHavaTasks = [];

    it('(할 일이 없어요!) 문구를 렌더링 한다.', () => {
      const { container } = renderElement('', noHavaTasks);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('2-2. tasks가 있는 경우.', () => {
    // props
    const haveTasks = [
      { id: 0, title: '첫 번째 할일' },
      { id: 1, title: '두 번째 할일' },
    ];

    it('(첫 번째 할일), (두 번째 할일)을 렌더링 한다.', () => {
      const { container } = renderElement('', haveTasks);
      expect(container).toHaveTextContent('첫 번째 할일');
      expect(container).toHaveTextContent('두 번째 할일');
    });

    it('완료 버튼을 누르면, 해당하는 task의 handleClickDelete가 실행된다.', () => {
      const { getAllByText } = renderElement('', haveTasks);
      expect(handleClickDeleteTask).not.toBeCalled();
      fireEvent.click(getAllByText('완료')[0]);
      expect(handleClickDeleteTask).toBeCalled();

      fireEvent.click(getAllByText('완료')[1]);
      expect(handleClickDeleteTask).toBeCalledTimes(2);
    });
  });
});
