import { render, fireEvent } from '@testing-library/react';

import Page from './Page';
import tasksDefault from './tasks';

// jest.fn(); 계속 써야하는가?
// 중복된 테스트같은데 어떻게 해야하나?
// 통합테스트
// 테스트 == 예제

// 테스트를 메뉴얼로!
describe('Page', () => {
  const tasks = tasksDefault;
  const taskTitle = '나는 타이틀';

  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const renderPage = () => render((
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      onClickDeleteTask={handleClickDelete}
    />
  ));

  it('renders tasks and input', () => {
    const { container, getByPlaceholderText } = renderPage();

    tasks.forEach(({ title }) => {
      expect(container).toHaveTextContent(title);
    });

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
  });

  describe('Changing task title', () => {
    it('calls onChangeTitle handler', () => {
      const { getByPlaceholderText } = renderPage();

      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: '책 읽기' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  describe('Clicking add button', () => {
    it('calls onClickAddTasks handler', () => {
      const { getByText } = renderPage();

      fireEvent.click(getByText('추가'));

      expect(handleClickAdd).toBeCalled();
    });
  });

  describe('Clicking delete button', () => {
    it('calls onClickDeleteTask handler', () => {
      const { getAllByText } = renderPage();

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDelete).toBeCalled();
    });
  });
});
