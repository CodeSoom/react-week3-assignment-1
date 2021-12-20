import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function renderInput(value) {
    return render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  };

  it('display input value', () => {
    const { getByDisplayValue } = renderInput('기존 할 일');

    expect(getByDisplayValue('기존 할 일')).not.toBeNull();
  })

  it('change text with input', () => {
    const { getByLabelText } = renderInput();

    const textInput = getByLabelText('할 일');

    fireEvent.change(textInput, {
      target: { value: '코드숨 과제하기' },
    });

    expect(handleChange).toBeCalled();
    expect(textInput.value).toBe('코드숨 과제하기');
  })

  it('click 추가 button', () => {
    const { getByText } = renderInput();

    const button = getByText('추가');

    fireEvent.click(button);

    expect(handleClick).toBeCalled()
  })
});
