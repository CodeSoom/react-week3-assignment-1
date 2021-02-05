import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('화면이 띄워질 때', () => {
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
});
