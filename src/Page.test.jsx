import { render } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  const tasks = [];
  const taskTitle = '';
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderPage = () => render(
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onClickDeleteTask={handleClick}
      onClickAddTask={handleClick}
      onChangeTitle={handleChange}
    />,
  );

  // 테스트가 실행되기 전에 실행
  beforeEach(() => {
    // mocking 함수들을 초기화
    jest.clearAllMocks();
  });

  it('renders page', () => {
    // Given
    const { container, getByText, getByLabelText } = renderPage();

    // Then
    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(getByLabelText(/할 일/)).toBeInTheDocument();
    expect(getByText(/추가/)).toBeInTheDocument();
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
