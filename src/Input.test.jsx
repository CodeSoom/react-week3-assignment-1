import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();

  const handleChange = jest.fn();

  const renderInput = () => (
    render((
      <Input
        value="아무거나 하기"
        onClick={handleClick}
        onChange={handleChange}
      />))
  );

  it('renders input and button', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('listens "추가" button click event', () => {
    const { getByText } = renderInput();

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it('renders todo title', () => {
    const { getByDisplayValue } = renderInput();

    expect(getByDisplayValue('아무거나 하기')).not.toBeNull();
  });
});
