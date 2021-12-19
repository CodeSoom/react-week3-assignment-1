import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { getByDisplayValue, getByLabelText, getByText } = render((
    <Input
      value="기존 할 일"
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />));

  expect(getByDisplayValue('기존 할 일')).not.toBeNull();

  fireEvent.change(getByLabelText('할 일'), {
    target: {
      value: '무언가 하기',
    },
  });
  expect(onChangeTitle).toBeCalled();

  fireEvent.click(getByText('추가'));
  expect(onClickAddTask).toBeCalled();
});
