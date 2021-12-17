import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const value = '';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('renders all elements', () => {
    const { container, getByPlaceholderText } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(value);
    expect(container).toHaveTextContent('추가');
  });

  describe('when changing input value', () => {
    it('call handleChange', () => {
      const { getByPlaceholderText } = renderInput();
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveValue('');
      expect(handleChange).not.toBeCalled();
      fireEvent.change(input, { target: { value: '할 일을 입력했다' } });
      expect(handleChange).toBeCalled();
    });
  });

  describe('when clicking button', () => {
    it('call handleClick', () => {
      const { getByText } = renderInput();
      const button = getByText('추가');

      expect(handleClick).not.toBeCalled();
      fireEvent.click(button);
      expect(handleClick).toBeCalled();
    });
  });
});
