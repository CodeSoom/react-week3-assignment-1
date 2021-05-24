import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

// 화면을 보여주는 컴포넌트가 아닌 데이터를 다루는 컴포넌트이기 때문에
// 초기 데이터값이 렌더링 된 모습을 테스트해보는 것이 좋음
// 현재 tasks 초기 데이터값이 없음
describe('App 컴포넌트', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('renders', () => {
    const { getByText } = renderApp();

    expect(getByText(/추가/)).not.toBeNull();
    expect(getByText(/할 일이 없어요!/)).not.toBeNull();
  });

  it('할 일 추가하기', () => {
    const { getByText, getByLabelText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '멋대로 살기' } });
    fireEvent.click(getByText('추가'));
    expect(getByText(/멋대로 살기/)).not.toBeNull();
  });

  it('할 일 추가 후 완료하여 할 일 제거하기', () => {
    const { getByText, getByLabelText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '멋대로 살기' } });
    fireEvent.click(getByText('추가'));
    fireEvent.click(getByText('완료'));
    expect(getByText(/할 일이 없어요!/)).not.toBeNull();
  });
});
