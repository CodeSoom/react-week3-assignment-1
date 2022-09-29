import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '할 일';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});
