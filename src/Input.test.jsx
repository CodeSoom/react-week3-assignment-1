import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container, getByText, getByLabelText } = render(
    <Input onChange={onChange} />
  );

  const input = getByLabelText('할 일');
  const button = getByText('추가');

  fireEvent.change(input, { target: { value: '뭐라도 하기' } });

  expect(onChange).toBeCalled();

  fireEvent.click(button);

  expect(onClick).not.toBeCalled();
});
