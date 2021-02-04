import React from 'react';

import { render, fireEvent } from '@testing-library/react';

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
  it('listens change event', () => {
    const { getByLabelText } = renderApp();

    expect(getByLabelText('할 일')).toBeInTheDocument();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트 하기' } });

    expect(getByLabelText('할 일').value).toBe('홈트 하기');
  });

  it('listens click event', () => {
    const {
      getByLabelText, getByText, getAllByText,
    } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트하기' } });
    expect(getByLabelText('할 일').value).toBe('홈트하기');
    fireEvent.click(getByText('추가'));
    expect(getByLabelText('할 일').value).toBe('');

    fireEvent.click(getAllByText('완료')[0]);
    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
