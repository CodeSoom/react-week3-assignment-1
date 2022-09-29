import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Click Event', () => {
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

test('Change Event', () => {
  const handleChange = jest.fn();

  const { getByPlaceholderText } = render((
    <Input
      onChange={handleChange}
    />
  ));

  expect(handleChange).not.toBeCalled();

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '뿌잉' } });

  expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('value', '뿌잉');
});
