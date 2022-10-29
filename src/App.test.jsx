import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  /*  const tasks = [
    {
      id: 1,
      title: '넷플릭스 보기',
    },
    {
      id: 2,
      title: '아무것도 안하기',
    },
  ]; */

  it('추가버튼이 있는지 확인한다', () => {
    const { getByText } = render((
      <App />
    ));

    expect(getByText(/To-do/)).not.toBeNull();
    expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    expect(getByText(/추가/)).not.toBeNull();
  });

/*   context('onChange', () => {
    it('', () => {

    });
  }); */
});
