import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Input', () => {
  context('when Page loaded', () => {
    it('display Input component', () => {
      const PLACEHOLDER = '할 일을 입력해 주세요';

      const { getByPlaceholderText } = render((
        <Page
          tasks={[]}
        />
      ));

      const input = getByPlaceholderText(PLACEHOLDER);

      expect(input).toBeInTheDocument();
    });
  });
});

describe('Page List', () => {
  context('when Page loaded', () => {
    it('display List component', () => {
      const { queryByText } = render((
        <Page
          tasks={[]}
        />
      ));

      const list = queryByText('할 일이 없어요!');

      expect(list).toBeInTheDocument();
    });
  });
});
