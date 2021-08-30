import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input
      value=""
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
    const { getByLabelText } = renderInput();

    const inputNode = getByLabelText('TodoContent');

    fireEvent.change(inputNode, { target: { value: '코드숨 과제하기' } });

    expect(handleChange).toBeCalledWith('코드숨 과제하기');
  });
});
