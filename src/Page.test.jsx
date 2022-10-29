import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

describe('<Page />', () => {
  const tasks = [{
    id: 1,
    content: '잠자기',
  },
  {
    id: 2,
    content: '누워있기',
  },
  ];

  const taskTitle = '';

  const handleDeleteTask = jest.fn();
  const handleChangeTitle = jest.fn();
  const handleAddTask = jest.fn();

  it('Page에 할일, 추가, 삭제 버튼이 있는가', () => {
    const { container, getByText } = render((
      <Page
        tasks={tasks}
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleAddTask}
        onClickDeleteTask={handleDeleteTask}
      />));

    expect(container).toHaveTextContent('완료');

    fireEvent.click(getByText('추가'));
    expect(handleAddTask).toBeCalled();
  });
});
