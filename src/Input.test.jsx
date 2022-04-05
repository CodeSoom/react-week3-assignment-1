import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '테스트 입력';

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByRole } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  fireEvent.change(getByRole('textbox'), { target: { value } });

  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalledTimes(1);
});
