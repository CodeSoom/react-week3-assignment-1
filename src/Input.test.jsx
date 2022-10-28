import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();
  const InputElement = () => render((<Input
    value="잠자기"
    onClick={handleClick}
    onChange={handleChange}
  />));

  it('Input 추가 버튼이 호출된다', () => {
    const { getByText } = InputElement();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it('Input에 입력한 값이 제대로 랜더링 된다', () => {
    InputElement();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '잠자기',
      },
    });

    expect(input).toHaveAttribute('value', '잠자기');
  });
});
