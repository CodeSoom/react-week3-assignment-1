import {
  fireEvent, getByPlaceholderText, getByText, render,
} from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  // const handleClick = jest.fn();
  const { container } = render((
    <Input value="" onChange={onChange} onClick={onClick} />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(onChange).not.toBeCalled();

  const inputText = '뭐라도 하기';
  fireEvent.change(getByPlaceholderText(container, '할 일을 입력해 주세요'), { target: { value: inputText } });
  expect(onChange).toBeCalled();

  const button = getByText(container, '추가');
  fireEvent.click(button);
  expect(onClick).toBeCalled();
});
