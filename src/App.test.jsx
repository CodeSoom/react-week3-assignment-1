import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  const renderApp = () => render((
    <App />
  ));

  it('할 일을 입력하고 추가를 누르면 할 일 목록에 추가한 목록이 보인다.', () => {
    const { getByText, getByPlaceholderText } = renderApp();

    const inputNode = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(inputNode, { target: { value: '아무것도 하지 않기' } });
    fireEvent.click(getByText('추가'));

    expect(getByText('아무것도 하지 않기')).toBeVisible();
  });

  it('할 일을 입력하고 추가를 누르면 input의 텍스트가 지워진다.', () => {
    const { getByText, getByPlaceholderText } = renderApp();

    const inputNode = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(inputNode, { target: { value: '아무것도 하지 않기' } });
    fireEvent.click(getByText('추가'));

    expect(inputNode).toHaveValue('');
  });

  it('할 일을 완료하면 할 일이 목록에서 보이지 않는다.', () => {
    // TODO
  });
});
