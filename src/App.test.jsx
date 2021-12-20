import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders Page', () => {
    const { getByText } = render((
      <App />
    ));

    // 화면에서 볼 수 있는 모습을 예측
    expect(getByText(/추가/)).not.toBeNull();
    expect(getByText(/코드숨 과제하기!/)).not.toBeNull();

    // TODO: 통합 테스트 코드 작성
    // CodeceptJS => 실제 브라우저에서 사용자 테스트 실행 가능.
  });
});
