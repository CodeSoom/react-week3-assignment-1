import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleClick = jest.fn();

  const handleChange = jest.fn();

  const { container, getByText } = render((
    <Input
      value="아무거나 하기"
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});
