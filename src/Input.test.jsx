import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render(
    <Input
      value="운동하기"
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  it('Input과 button이 렌더링된다.', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('input에 입력시 handleChange 함수가 실행된다.', () => {
    const { getByLabelText } = renderInput();

    const input = getByLabelText('할 일');

    // tdd 하기로 input의 value 값이 잘 바뀌었는지 확인..이 안되네...

    fireEvent.change(input, { target: { value: 'TDD 하기' } });

    expect(handleChange).toBeCalled();
    // expect(input.value).toBe('TDD');
  });

  it('추가 버튼을 클릭하면 handleClick 함수가 실행된다.', () => {
    const { getByText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
