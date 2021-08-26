import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App은', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('Page 컴포넌트를 보여준다.', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가할 일이 없어요!');
    expect(container).toHaveTextContent('추가');
  });

  it('추가 버튼을 누르면, 할 일을 추가한다.', () => {
    const { container, getByText, getByLabelText } = renderApp();
    const button = getByText('추가');
    const input = getByLabelText('할 일');

    fireEvent.change(input, { target: { value: '새로운 할 일' } });
    expect(input).toHaveDisplayValue('새로운 할 일');
  });

  it('"완료" 버튼을 누르면, 할 일을 삭제한다.', () => {
    const { container, getByText, getByLabelText } = renderApp();
    const input = getByLabelText('할 일');

    expect(input).toHaveDisplayValue('');

    fireEvent.change(input, { target: { value: '빙수 먹기' } });
    expect(input).toHaveDisplayValue('빙수 먹기');

    fireEvent.click(getByText('추가'));
    expect(input).toHaveDisplayValue('');
    expect(container).toHaveTextContent('빙수 먹기');

    fireEvent.click(getByText('완료'));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
