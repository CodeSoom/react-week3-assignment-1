import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();

  const handleChange = jest.fn();

  const renderInput = () => (
    render(
      <Input
        value="아무거나 하기"
        onClick={handleClick}
        onChange={handleChange}
      />,
    )
  );

  it('render input', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('"추가" button', () => {
    const { getByText } = renderInput();

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
