import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const { container, getByText, getByPlaceholderText } = render((
    <App />
  ));

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'TDD 과제하기' } });
  it('input 입력시 input이 업데이트 된다.', () => {
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('TDD 과제하기');
  });

  it('추가버튼을 누르면 input내용이 비워집니다.', () => {
    fireEvent.click(getByText('추가'));
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
    expect(container).toHaveTextContent('TDD 과제하기');
  });

  it('완료버튼을 누르면 onClickDeleteTask가 실행된다.', () => {
    fireEvent.click(getByText('완료'));
  });
});
