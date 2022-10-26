import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();

  const { container, getByText } = render((
    <Input
      onChange={handleChange}
    />
  ));

  fireEvent.click(getByText('추가'));

  expect(handleChange).not.toBeCalled();
});
