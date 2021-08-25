import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '안녕하세용';

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();

  expect(handleChange).not.toBeCalled();
  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '타이핑' } });
  expect(handleChange).toBeCalled();
});
