import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const {
    container,
    getByLabelText,
    getByText,
  } = render((
    <Input
      value=""
      onChange={handleChange}
      onClick={handleClick}
    />));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleChange).not.toBeCalled();

  fireEvent.change(getByLabelText('할 일'), { target: { value: '아무거나' } });
  expect(handleChange).toBeCalledTimes(1);

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalledTimes(1);
});
