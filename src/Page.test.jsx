import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('when it renders', () => {
    it('renders a heading', () => {
      const { container } = render((<Page />));

      expect(container).toContainHTML('<h1');
    });
  });
});
