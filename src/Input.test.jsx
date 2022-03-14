import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const inputValue = '아무거나 입력하기';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { queryByPlaceholderText } = render((
    <Input
      value={inputValue}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  const searchInput = queryByPlaceholderText('할 일을 입력해 주세요');

  expect(searchInput.value).toBe('아무거나 입력하기');

  expect(handleClick).not.toBeCalled();
  expect(handleChange).not.toBeCalled();
});
