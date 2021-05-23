import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const {
    container, getByLabelText, getByPlaceholderText, getByRole, getByText,
  } = render((
    <Input value="새로운 할일" onChange={handleChange} onClick={handleClick} />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(getByRole('textbox').value).toMatch('새로운 할일');
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeValid();
  expect(getByRole('button', { name: '추가' })).toBeValid();

  fireEvent.click(getByText('추가'));
  expect(getByRole('textbox').value).toMatch('');

  fireEvent.change(getByLabelText('할 일'), {
    target: {
      value: '이벤트 추가',
    },
  });
  expect(handleChange).toBeCalled();

  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});
