import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';

  const handleClickAdd = jest.fn();

  const { container, getByText } = render((
    <Input
      value={value}
      onChange={handleClickAdd}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(handleClickAdd).not.toBeCalled();

  fireEvent.click(getByText('추가'));
});
