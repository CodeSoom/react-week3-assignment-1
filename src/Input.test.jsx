import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const {
    container, getByPlaceholderText, getByRole, getByText,
  } = render((
    <Input value="새로운 할일" onChange={handleChange} onClick={handleClick} />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(getByRole('textbox').value).toMatch('새로운 할일');
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeValid();
  expect(getByRole('button', { name: '추가' })).toBeValid();

  fireEvent.click(getByText('추가'));
  expect(getByRole('textbox').value).toMatch('');
});
