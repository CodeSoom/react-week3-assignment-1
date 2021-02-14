import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

// TODO: Page 컴포넌트 테스트 작성
// 1. Page render 확인
// 2. 각 상태 기능 생성

describe('Input', () => {
  it('render input', () => {
    render((
      <Input />

    ));
  });
});
