import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onClick = jest.fn();
  const onChange = jest.fn();

  function getInputElement() {
    const container = render(<Input onChange={onChange} onClick={onClick} />);
    const input = container.getByLabelText('할 일');
    const button = container.getByText('추가');

    return {
      ...container, input, button,
    };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input, button', () => {
    const { input, button } = getInputElement();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('changes input value', () => {
    const { input } = getInputElement();
    const inputValue = '운동 하기';

    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);
  });

  it('calls onchange', () => {
    const { input } = getInputElement();
    const inputValue = '운동 하기';

    expect(input.value).toBe('');
    expect(onChange).not.toBeCalled();

    fireEvent.change(input, { target: { value: inputValue } });
    expect(onChange).toBeCalled();
  });

  it('calls onclick', () => {
    const { input, button } = getInputElement();
    const inputValue = '운동 하기';

    fireEvent.change(input, { target: { value: inputValue } });
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });
});
