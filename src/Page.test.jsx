import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

// TODO: Page 컴포넌트 테스트 작성
// 1. Page render 확인

describe('Page', () => {
  const tasks = [
    { id: 1, title: '오늘은 무엇을 해볼까?' },
  ];

  it('render Head Title', () => {
    const { getByText } = render((
      <Page
        tasks={tasks}
      />
    ));

    expect(getByText(/To-do/)).not.toBeNull();
    expect(getByText(/오늘은 무엇을 해볼까/)).not.toBeNull();
  });
});
