import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

const renderInput = () => {
  const handleAddNewTask = jest.fn();
  const handleChangeTaskTitle = jest.fn();

  render(
    <Input
      onClick={handleAddNewTask}
      onChange={handleChangeTaskTitle}
    />,
  );
};

describe('Input 컴포넌트', () => {
  it('화면에 렌더된다.', () => {
    renderInput();

    expect(screen.getByText('추가')).toBeInTheDocument();
  });

  it('input은 빈 값으로 렌더된다.', () => {
    renderInput();

    expect(screen.getByLabelText('할 일'));
  });

  it('입력하는 값과 같은 값이 화면에 렌더된다.', () => {
    renderInput();

    const value = '새로운 값이에요';

    fireEvent.change(screen.getByLabelText('할 일'), { target: { value } });

    expect(screen.getByLabelText('할 일')).toHaveDisplayValue(value);
  });
});
