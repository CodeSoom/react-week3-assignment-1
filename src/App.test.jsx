import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

// App이 그려지면 각 컴포넌트들이 존재하는 지 확인
// - Default 상태로 render 된 페이지의 요소들을 확인한다.
// - input 창을 확인한다.

describe('App', () => {
  it('render App', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('render input to write task', () => {
    const { getByLabelText } = render((
      <App />
    ));

    const input = getByLabelText('할 일');

    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: '비가 오는 날엔 부침개' } });

    expect(input).toHaveValue('비가 오는 날엔 부침개');
  });
});
