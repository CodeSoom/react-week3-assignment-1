import { render, screen, fireEvent } from '@testing-library/react';

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

  it('listens button click event', () => {
    const { getByText } = renderInput();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('listens value change event', () => {
    renderInput();

    const inputNode = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputNode, { target: { value: '코드숨 과제하기' } });

    expect(handleChange).toBeCalledWith('코드숨 과제하기');
  });
});
