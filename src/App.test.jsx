import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  // const state = {
  //   newId: '101',
  //   taskTitle: '테스트 입력!',
  //   tasks: [] };

  render((
    <App />
  ));

  // 매개변수가 전혀 없는 App은 어떻게 테스트 해야할까?
});
