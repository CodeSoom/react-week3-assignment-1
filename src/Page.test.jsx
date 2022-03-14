// 데이터를 입력하는 부분까지 테스트를 해야 함

import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const { getByText } = render((
    <Page />
  ));
});
