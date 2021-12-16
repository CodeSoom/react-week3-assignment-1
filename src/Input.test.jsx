import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByPlaceholderText, getByText } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  // input의 값이 바뀌면 handleChange가 호출되어야 한다.
  const input = getByPlaceholderText('할 일을 입력해 주세요');
  expect(input).toHaveValue('');
  expect(handleChange).not.toBeCalled();
  // 값을 정확히 지시해야??
  // => value 값이 있는 위치를 정확히!
  fireEvent.change(input, { target: { value: '할 일을 입력했다' } });
  expect(handleChange).toBeCalled();

  // 버튼을 누르면 handleClick이 호출되어야 한다.
  const button = getByText('추가');
  expect(handleClick).not.toBeCalled();
  fireEvent.click(button);
  expect(handleClick).toBeCalled();
});
