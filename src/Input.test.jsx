import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  it('Rendered component', () => {
    const { container, getByPlaceholderText } = render((
      <Input />
    ));

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeEnabled();
  });

  it('Changed input value', () => {
    const { getByPlaceholderText } = render((
      <Input
        onChange={handleChange}
      />
    ));

    expect(handleChange).not.toBeCalled();

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '잠자기' } });

    expect(input.value).toBe('잠자기');
    expect(handleChange).toBeCalled();
  });

  it('Click add button', () => {
    const { getByText, getByPlaceholderText } = render((
      <Input
        onClick={handleClick}
        onChange={handleChange}
      />
    ));

    expect(handleClick).not.toBeCalled();

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '잠자기' } });

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
