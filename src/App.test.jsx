import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

import testIds from './componentTestID';

describe('App', () => {
  const { container, getByTestId } = render((<App />));

  context('When loaded', () => {
    it('show page component', () => {
      const pageComponent = getByTestId(testIds.Page);
      expect(container).toContainElement(pageComponent);
    });
  });
});
