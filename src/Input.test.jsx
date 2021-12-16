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
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  const textInput = getByLabelText('할 일');

  expect(handleChange).not.toBeCalled();

  fireEvent.change(textInput, { target: { value: '코드숨 과제하기' } });

  expect(textInput.value).toBe('코드숨 과제하기');


  expect(container).toHaveTextContent('추가');
  const button = getByText('추가');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(button);

  expect(handleClick).toBeCalled()
});
