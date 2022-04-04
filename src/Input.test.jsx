import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByRole } = render((
    <Input
      value=""
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  fireEvent.change(getByRole('textbox'), { target: { value: '신나게 놀기' } });

  expect(handleChange).toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
  expect(handleChange).toBeCalled();
});
