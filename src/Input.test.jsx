import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('input의 placeholder는 "할 일을 입력해 주세요" 이다.', () => {
    const { queryByPlaceholderText } = renderInput();

    const inputElement = queryByPlaceholderText('할 일을 입력해 주세요');
    expect(inputElement).not.toBe(null);
  });

  it('"추가" 버튼이 존재해야 한다.', () => {
    const { queryByText } = renderInput();
    const buttonElement = queryByText('추가');

    expect(buttonElement).not.toBe(null);
  });

  it('input에 특정 값이 전달된다.', () => {
    const { queryByDisplayValue } = renderInput('테스트');
    const inputElement = queryByDisplayValue('테스트');

    expect(inputElement).not.toBe(null);
  });

  it('input의 onChange 이벤트가 작동해야 한다.', () => {
    const { queryByDisplayValue } = renderInput();
    const inputElement = queryByDisplayValue('');
    const newValue = '하이';

    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(handleChange).toBeCalled();
    expect(inputElement).toHaveValue('하이');
  });

  it('"추가" 버튼을 누르면 onClick 이벤트가 실행된다.', () => {
    const { getByText } = renderInput();
    const buttonElement = getByText('추가');

    fireEvent.click(buttonElement);

    expect(handleClick).toBeCalled();
  });
});
