import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  it('has label', () => {
    const { getByLabelText } = render(<Input />);
    getByLabelText('할 일');
  });

  it('has input', () => {
    const { getByPlaceholderText } = render(<Input />);
    getByPlaceholderText('할 일을 입력해 주세요');
  });

  it('has button', () => {
    const { getByText } = render(<Input />);
    getByText('추가');
  });

  it('changes input', () => {
    const { getByPlaceholderText } = render(<Input />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '아무것도 하지 않기',
      },
    });

    expect(input.value).toBe('아무것도 하지 않기');
  });

  it('click add button', () => {
    const handleClick = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <Input onClick={handleClick} />,
    );

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: '아무것도 하지 않기',
      },
    });

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
    expect(input).toHaveAttribute('value', '');
  });
});
