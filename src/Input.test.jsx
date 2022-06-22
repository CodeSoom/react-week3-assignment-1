import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const value = '지금 할 일';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const setUp = () => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  beforeEach(() => {
    handleChange.mockClear();
    handleClick.mockClear();
  });

  it('renders label', () => {
    const { container } = setUp();

    expect(container).toHaveTextContent('할 일');
  });

  it('renders value', () => {
    const { getByDisplayValue } = setUp();

    expect(getByDisplayValue(value)).toBeInTheDocument();
  });

  context('when input is changed', () => {
    it('calls onChange', () => {
      const { getByPlaceholderText } = setUp();

      expect(handleChange).not.toBeCalled();
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'a' } });
      expect(handleChange).toBeCalled();
    });
  });

  context('when button is clicked', () => {
    it('calls onClick', () => {
      const { getByText } = setUp();

      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });
  });
});
