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
  const value = '뿌잉';
  const { getByPlaceholderText } = render((<Input value={value} />));
  const input = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(input, { target: { value: value } });

  expect(input).toHaveAttribute('value', value);
});
