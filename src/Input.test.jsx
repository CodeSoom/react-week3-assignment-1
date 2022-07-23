import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByText, getByLabelText } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleChange).not.toBeCalled();

  fireEvent.change(getByLabelText('할 일'), { target: { value: '아무 것도 하지 않기' } });

  expect(handleChange).toBeCalled();

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});
