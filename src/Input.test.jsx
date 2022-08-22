import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  it('Renders a button to add task', () => {
    const value = '';
    const { container } = renderInput(value);

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('Enter a task and a change event will occur', () => {
    const { getByPlaceholderText } = renderInput();

    expect(handleChange).not.toBeCalled();

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '잠자기' } });

    expect(handleChange).toBeCalled();
  });

  it('Reder after change event occurs', () => {
    const value = '잠자기';
    const { getByPlaceholderText } = renderInput(value);

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('잠자기');
  });

  it('Click the Add button to add a task', () => {
    const { getByText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
