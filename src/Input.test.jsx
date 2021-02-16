import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('입력값 변화, 할일 추가 함수 테스트', () => {
  const taskTitle = '커피 마시기';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  it('값이 입력됐을 때 onChange()가 호출된다.', () => {
    const { getByPlaceholderText } = render((
      <Input onChange={onChangeTitle} />
    ));

    const todoTitleField = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(todoTitleField, {
      target: {
        value: taskTitle,
      },
    });
    expect(todoTitleField.value).toBe(taskTitle);
    expect(onChangeTitle).toBeCalled();
  });

  it('추가버튼을 누르면 입력창에 글자들이 사라진다.', () => {
    const { getByText, getByPlaceholderText } = render((
      <Input onClick={onClickAddTask} />
    ));

    fireEvent.click(getByText('추가'));
    expect(onClickAddTask).toBeCalled();
    expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe('');
  });
});
