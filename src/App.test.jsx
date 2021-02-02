import React from 'react';

import {
  render, fireEvent,
} from '@testing-library/react';

import App from './App';

/**
 * 테스트 목록
 *
 * Page 컴포넌트가 렌더링되었을때
 *  input에 값이 입력하면 input value가 바뀐다
 *  추가버튼을 누르면 input value가 tasks에 추가된다
 *
 *  task에서 완료 버튼을 누르면 해당 task가 사라진다
 */

const renderApp = () => render(<App />);

describe('App', () => {
  it('Entering a value in input changes the value', () => {
    const { getByDisplayValue, getByPlaceholderText } = renderApp();

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '홈트 하기' } });

    expect(getByDisplayValue('홈트 하기')).toBeInTheDocument();
  });

  it('When you click the add button, the input value is added to tasks', () => {
    const { getByDisplayValue, getByPlaceholderText, getByText } = renderApp();

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '홈트 하기' } });
    expect(getByDisplayValue('홈트 하기')).toBeInTheDocument();

    fireEvent.click(getByText('추가'));

    expect(getByText('홈트 하기')).toBeInTheDocument();
  });
});
