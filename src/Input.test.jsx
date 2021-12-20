import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('할 일 입력값 작성시 변경', () => {
    const value = '뭐라도 하기';
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render((
      <Input
        value={value}
        onChange={handleChange}
      />
    ));

    const inputTodo = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(inputTodo, { value: '뭐라도 하기' });
    expect(inputTodo).toHaveAttribute('value', '뭐라도 하기');
  });

  it('추가 버튼 클릭', () => {
    const handleClick = jest.fn();

    const { container, getByText } = render((
      <Input
        onClick={handleClick}
      />
    ));

    expect(container).toHaveTextContent('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
