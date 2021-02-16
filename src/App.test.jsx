import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('placeholder 변경 이벤트 처리', () => {
    const { getByPlaceholderText } = renderApp();

    const placeholder = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(placeholder, { target: { value: '잠자기' } });

    expect(placeholder.value).toBe('잠자기');
  });

  it('추가 버튼 클릭시 todo 목록에 추가', () => {
    const { getByText, getByPlaceholderText } = renderApp();

    const placeholder = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(placeholder, { target: { value: '잠자기' } });

    fireEvent.click(getByText('추가'));

    expect(placeholder.value).toBe('');
    expect(getByText('잠자기')).toBeInTheDocument();
  });

  it('투두의 완료 버튼 클릭시 투두 목록에서 제거', () => {
    const { getByText, getByPlaceholderText, getAllByText } = renderApp();

    const placeholder = getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = getByText('추가');

    fireEvent.change(placeholder, { target: { value: '잠자기' } });

    fireEvent.click(addButton);

    fireEvent.change(placeholder, { target: { value: '운동하기' } });

    fireEvent.click(addButton);

    expect(getAllByText('완료').length).toBe(2);

    fireEvent.click(getAllByText('완료')[0]);

    expect(getAllByText('완료').length).toBe(1);
  });
});
