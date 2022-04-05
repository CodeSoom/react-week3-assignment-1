import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const label = '할 일';
const value = '할일!!';
const onChange = jest.fn();
const onClick = jest.fn();

const changedValue = '테스트 코드 작성';

it('Input', () => {
  const { container, getByText, getByRole } = render(
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />,
  );

  expect(container).toHaveTextContent(label);

  const input = getByRole('textbox');

  expect(input).toHaveValue(value);

  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(onClick).toBeCalled();

  expect(onChange).not.toBeCalled();

  fireEvent.change(getByRole('textbox'), { target: { value: changedValue } });

  expect(onChange).toBeCalledWith(changedValue);
});
