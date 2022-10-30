import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const handleClickAddTask = jest.fn();
  const handleChangeTitle = jest.fn();

  const InputElement = (taskTitle = '') => render((<Input
    value={taskTitle}
    onClick={handleClickAddTask}
    onChange={handleChangeTitle}
  />));

  it('Input 추가 버튼이 호출된다', () => {
    const { getByText } = InputElement();

    expect(handleClickAddTask).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClickAddTask).toBeCalled();
  });

  it('Input에 입력한 값이 제대로 랜더링 된다', () => {
    InputElement('잠자기2');

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');

    expect(input.value).toBe('잠자기2');
  });
});
