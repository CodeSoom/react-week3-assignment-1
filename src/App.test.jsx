import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('when rendering text', () => {
    it('verify Input visible', () => {
      const { getByLabelText } = render((
        <App />
      ));

      expect(getByLabelText('할 일')).toBeVisible();
    });

    it('verify List visible', () => {
      const { getByText } = render((
        <App />
      ));

      expect(getByText('할 일이 없어요!')).toBeVisible();
    });
  });
  context('when rendering buttons', () => {
    it('verify "추가" button visible', () => {
      const { getByText } = render((
        <App />
      ));

      expect(getByText('추가')).toBeVisible();
    });
  });
});
