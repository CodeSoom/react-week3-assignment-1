import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('input에 값이 변경하면 input의 값이 변경된다', () => {
    const { getByLabelText } = render(<App />);

    const inputTaskTitle = getByLabelText('할 일');

    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });

    expect(inputTaskTitle).toHaveValue('뭐라도 하기');
  });

  it('"추가" 버튼을 클릭하면 list에 task가 추가된다', () => {
    const { container, getByLabelText, getByText } = render(<App />);

    const inputTaskTitle = getByLabelText('할 일');
    const addButton = getByText('추가');

    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });
    fireEvent.click(addButton);

    expect(container).toHaveTextContent('뭐라도 하기');
  });

  it('"추가" 버튼이 클릭하면 input의 값이 초기화된다', () => {
    const { getByLabelText, getByText } = render(<App />);

    const inputTaskTitle = getByLabelText('할 일');
    const addButton = getByText('추가');

    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });
    fireEvent.click(addButton);

    expect(inputTaskTitle).toHaveValue('');
  });

  it('"삭제" 버튼이 클릭하면 list에 선택된 task가 삭제된다.', () => {
    const { container, getByLabelText, getByText } = render(<App />);

    const inputTaskTitle = getByLabelText('할 일');
    const addButton = getByText('추가');

    fireEvent.change(inputTaskTitle, { target: { value: '뭐라도 하기' } });
    fireEvent.click(addButton);

    const deleteButton = getByText('완료');
    fireEvent.click(deleteButton);

    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(container).not.toHaveTextContent('뭐라도 하기');
  });
});
