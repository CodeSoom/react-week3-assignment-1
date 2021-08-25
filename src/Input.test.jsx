import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByLabelText, getByText } = render((
    <Input
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const input = getByLabelText('할 일');

  expect(input.placeholder).toEqual('할 일을 입력해 주세요');
  fireEvent.change(input, { target: { value: '뭐라도 하기' } });

  const button = getByText('추가');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(button);
  expect(handleClick).toBeCalled();
});
