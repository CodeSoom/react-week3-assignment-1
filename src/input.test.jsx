import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('shows empty todo input', () => {
    render(<Input />);

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

    expect(inputTodo.value).toBe('');
  });

  it('shows 추가 button', () => {
    const { container } = render(<Input />);

    expect(container).toHaveTextContent('추가');
  });

  it('changes todo input', () => {
    render(<Input />);

    const todo = '뭐라도 하기';

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputTodo, { target: { value: todo } });
    expect(inputTodo.value).toBe('뭐라도 하기');
  });

  it('adds the task', () => {
    const handleClick = jest.fn();

    const { getByText } = render(<Input onClick={handleClick} />);

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
