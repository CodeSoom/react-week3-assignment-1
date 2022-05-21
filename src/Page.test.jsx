import { fireEvent, render } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  test('할 일을 입력하고 추가 버튼을 누르면 리스트가 추가된다.', async () => {
    const tasks = [{ id: 0, title: '코드숨 과제하기' }];

    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const { container, getByRole, getByText } = render(
      <Page
        tasks={tasks}
        taskTitle=""
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );

    expect(container).toHaveTextContent('코드숨 과제하기');

    const input = getByRole('textbox', { name: /할 일/ });
    const addButton = getByRole('button', { name: /추가/ });

    fireEvent.change(input, { target: { value: '잠자기' } });

    expect(handleChangeTitle).toHaveBeenCalled();

    fireEvent.click(addButton);

    expect(handleClickAddTask).toHaveBeenCalledTimes(1);

    expect(getByText('코드숨 과제하기')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('완료 버튼을 누르면 Task 삭제 함수가 호출된다.', async () => {
    const tasks = [{ id: 0, title: '코드숨 과제하기' }];

    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const { container, getByRole } = render(
      <Page
        tasks={tasks}
        taskTitle=""
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );

    const doneButton = getByRole('button', { name: /완료/ });

    expect(container).toHaveTextContent('코드숨 과제하기');
    expect(doneButton).toBeInTheDocument();

    fireEvent.click(doneButton);

    expect(handleClickDeleteTask).toHaveBeenCalledWith(0);
  });
});
