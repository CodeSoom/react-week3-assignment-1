import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('change text with input', () => {
    const { getByLabelText } = renderInput();

    const textInput = getByLabelText('할 일');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(textInput, { target: { value: '코드숨 과제하기' } });

    expect(textInput.value).toBe('코드숨 과제하기');
  })

  it('click 추가 button', () => {
    const { getByText } = renderInput();

    const button = getByText('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(button);

    expect(handleClick).toBeCalled()
  })
});
