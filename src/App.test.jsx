import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  const { container } = render((
    <App />
  ));

  it('입력한 input값에 따른 task타이틀을 보여준다', () => {
    // TODO
  });

  it('할 일을 입력하고 추가를 누르면 할 일 목록에 추가한 목록이 보인다.', () => {
    // TODO
  });

  it('할 일을 입력하고 추가를 누르면 input의 텍스트가 지워진다.', () => {
    // TODO
  });

  it('할 일을 완료하면 할 일이 목록에서 보이지 않는다.', () => {
    // TODO
  });
});
