import React from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('input에 값이 변경 되었을 때, input의 값이 변경되는 지 확인', () => {
    const { getByDisplayValue } = render(<App />);

    const inputTaskTitle = getByDisplayValue('');

    expect(inputTaskTitle).toHaveValue('');
    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });
    expect(inputTaskTitle).toHaveValue('뭐라도 하기');
  });

  it('"추가" 버튼이 클릭 되었을 때, list에 task가 추가 되는 지 확인', () => {
    const { getByDisplayValue, getByText } = render(<App />);

    const inputTaskTitle = getByDisplayValue('');
    const addButton = getByText('추가');
    const emptyList = getByText('할 일이 없어요!');

    expect(emptyList).toHaveTextContent('할 일이 없어요!');
    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });
    fireEvent.click(addButton);
    const listTasks = getByText('뭐라도 하기');
    expect(listTasks).toHaveTextContent('뭐라도 하기');
  });

  it('"추가" 버튼이 클릭 되었을 때, input의 값이 초기화되는 지 확인', () => {
    const { getByDisplayValue, getByText } = render(<App />);

    const inputTaskTitle = getByDisplayValue('');
    const addButton = getByText('추가');

    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });
    expect(inputTaskTitle).toHaveValue('뭐라도 하기');
    fireEvent.click(addButton);
    expect(inputTaskTitle).toHaveValue('');
  });

  it('"삭제" 버튼이 클릭 되었을 때, list에 선택된 task가 삭제되는 지 확인', () => {
    const { getByDisplayValue, getByText } = render(<App />);

    const inputTaskTitle = getByDisplayValue('');
    const addButton = getByText('추가');

    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });
    fireEvent.click(addButton);

    const listTasks = getByText('뭐라도 하기');
    expect(listTasks).toHaveTextContent('뭐라도 하기');
    expect(listTasks).not.toHaveTextContent('할 일이 없어요!');

    const deleteButton = getByText('완료');
    fireEvent.click(deleteButton);

    const emptyList = getByText('할 일이 없어요!');
    expect(emptyList).toHaveTextContent('할 일이 없어요!');
    expect(emptyList).not.toHaveTextContent('뭐라도 하기');
  });
});
