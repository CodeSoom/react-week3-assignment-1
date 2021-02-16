import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('할일 추가, 완료 테스트', () => {
  const taskTitle = '커피 마시기';

  it('추가버튼을 누르면 입력창에 글자들이 사라진다.', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <App />
    ));

    const todoTitleField = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(todoTitleField, {
      target: {
        value: taskTitle,
      },
    });
    expect(todoTitleField.value).toBe(taskTitle);

    const addButton = getByText('추가');
    fireEvent.click(addButton);
    expect(todoTitleField.value).toBe('');
    expect(container).toHaveTextContent(taskTitle);
  });

  it('완료버튼을 누르면 할일이 사라진다.', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <App />
    ));

    const todoTitleField = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(todoTitleField, {
      target: {
        value: taskTitle,
      },
    });

    fireEvent.click(getByText('추가'));

    const doneButton = getByText('완료');
    fireEvent.click(doneButton);
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
