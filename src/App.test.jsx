import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('test', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('input 입력시 input이 업데이트 된다.', () => {
    const { getByPlaceholderText } = renderApp();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: 'TDD 과제하기' },
    });
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('TDD 과제하기');
  });

  it('추가버튼을 누르면 input내용이 비워집니다.', () => {
    const { getByText, getByPlaceholderText } = renderApp();

    fireEvent.click(getByText('추가'));
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
  });

  it('완료버튼을 누릅니다.', () => {
    const { getByText, getByPlaceholderText } = renderApp();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'TDD 과제하기' } });
    fireEvent.click(getByText('추가'));
    fireEvent.click(getByText('완료'));
  });
});
