import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('추가 버튼을 클릭하면 onClick가 호출됨', () => {
    const handleClick = jest.fn();
    const handleChange = jest.fn();
    const { getByText } = render(
      <Input
        onChange={handleChange}
        onClick={handleClick}
        value=""
      />,
    );

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it('할 일을 입력하면 onChange가 호출됨', () => {
    const handleClick = jest.fn();
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input onChange={handleChange} onClick={handleClick} value="" />,
    );

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: '일기쓰기' },
    });
    expect(handleChange).toBeCalled();
  });
});
