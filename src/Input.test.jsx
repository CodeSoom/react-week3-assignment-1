import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

import { TASK_TITLE } from './fixture';

describe('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const renderInputComponent = () => render(
    <Input value={TASK_TITLE} onChange={handleChangeTitle} onClick={handleClickAddTask} />,
  );

  it('input에 prop으로 넘겨준 value값이 입력되어있다', () => {
    renderInputComponent();
    const input = screen.getByRole('textbox');
    expect(input.value).toBe(TASK_TITLE);
  });

  it('투두 인풋의 버튼을 클릭하면 handleClickAddTask 함수가 호출된다', () => {
    const { getByText } = renderInputComponent();

    const addTodoButton = getByText('추가');
    fireEvent.click(addTodoButton);

    expect(handleClickAddTask).toBeCalled();
  });

  it('투두 인풋에 타이핑을 하면 handleChangeTitle 함수가 호출된다', () => {
    renderInputComponent();

    const toDoInput = screen.getByRole('textbox');
    fireEvent.change(toDoInput, { target: { value: '타이핑을 해주세요' } });

    expect(handleChangeTitle).toBeCalled();
  });
});
