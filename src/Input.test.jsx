import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const value = '지금 할 일';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    render(
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );
  });

  it('has label', () => {
    expect(screen.getByText('할 일')).toBeInTheDocument();
  });

  it('shows value in props', () => {
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('has input with placeholder and calls onChange when input is change', () => {
    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();
    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange).toBeCalled();
  });

  it('calls onClick when button is click', () => {
    expect(handleClick).not.toBeCalled();
    fireEvent.click(screen.getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
