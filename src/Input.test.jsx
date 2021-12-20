import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

import { TASK_TITLE } from './fixture';

describe('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const renderInput = () => render(
    <Input value={TASK_TITLE} onChange={handleChangeTitle} onClick={handleClickAddTask} />,
  );

  it('input에 할 일의 이름이 적혀있다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input.value).toBe(TASK_TITLE);
  });

  it('추가 버튼을 클릭하면 onClickAddTask 핸들러 함수가 호출된다', () => {
    const { getByText } = renderInput();

    const addTodoButton = getByText('추가');
    fireEvent.click(addTodoButton);

    expect(handleClickAddTask).toBeCalled();
  });

  it('투두 인풋에 타이핑을 하면 handleChangeTitle 함수가 호출된다', () => {
    renderInput();

    const toDoInput = screen.getByRole('textbox');
    fireEvent.change(toDoInput, { target: { value: '타이핑을 해주세요' } });

    expect(handleChangeTitle).toBeCalled();
  });
});
