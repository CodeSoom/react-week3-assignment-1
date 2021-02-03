import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('To do text typing test ', () => {
  const taskTitle = '커피 마시기';

  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const todoTitleField = getByPlaceholderText('할 일을 입력해 주세요');
  fireEvent.change(todoTitleField, {
    target: {
      value: taskTitle,
    },
  });
  expect(todoTitleField.value).toBe(taskTitle);
  // 23~29: onChangeTitle()가 해야할 일을 수동으로 구현한 것 같은데.. 더 좋은 방향이 있을까요?

  const addButton = getByText('추가');
  fireEvent.click(addButton);

  // 32~33: 추가 버튼을 클릭하면 edit text의 내용이 사라진 것을 체크하려고 해요.
  // expect(todoTitleField.value).toBe('');
});
