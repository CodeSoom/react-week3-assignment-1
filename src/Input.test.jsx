import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const setUp = (value = '') => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label', () => {
    const { container } = setUp();

    expect(container).toHaveTextContent('할 일');
  });

  it('renders value', () => {
    const value = '지금 할 일';
    const { getByDisplayValue } = setUp(value);

    expect(getByDisplayValue(value)).toBeInTheDocument();
  });

  it('listens value change event', () => {
    const { getByPlaceholderText } = setUp();

    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'a' } });
    expect(handleChange).toBeCalled();
  });

  it('listens button click event', () => {
    const { getByText } = setUp();

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
