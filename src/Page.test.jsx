import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('화면에 표시된 내용 테스트', () => {
  it('제목, 입력부분, 내용부분이 잘 표시된다.', () => {
    const { container } = render((
      <Page tasks={[]} />
    ));
    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
