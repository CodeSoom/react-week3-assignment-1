// TODO: Page 컴포넌트 테스트 작성
// 1. Page render 확인

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  test('render Page', () => {
    render((
      <Page />
    ));
  });
});
