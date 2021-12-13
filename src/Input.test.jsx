import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByRole } = render((
    <Input value="일어나기" onChange={handleChange} onClick={handleClick} />
  ));

  expect(container).toHaveTextContent('할 일');

  expect(getByRole('textbox').value).toBe('일어나기');

  expect(handleChange).not.toBeCalled();
  fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
  expect(handleChange).toBeCalledTimes(1);

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalledTimes(1);
});
