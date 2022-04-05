import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const label = '할 일';
const placeholder = '할 일을 입력해 주세요';
const value = '할일!!';
const buttonText = '추가';

const onChange = jest.fn();
const onClick = jest.fn();

const changedValue = '테스트 코드 작성';

it('Input', () => {
  const { container, getByText, getByPlaceholderText } = render(
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />,
  );

  expect(container).toHaveTextContent(label);
  expect(container).toHaveTextContent(buttonText);

  const input = getByPlaceholderText(placeholder);

  expect(input).toHaveValue(value);

  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText(buttonText));

  expect(onClick).toBeCalled();

  expect(onChange).not.toBeCalled();

  fireEvent.change(input, { target: { value: changedValue } });

  expect(onChange).toBeCalledWith(changedValue);
});
