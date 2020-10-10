import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  context('Initialize', () => {
    it('show message 할 일이 없어요!', () => {
      const { getByText } = render(
        <App />,
      );

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });
});
