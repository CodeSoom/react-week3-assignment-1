import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const { getByLabelText, getAllByText } = render((
    <App />
  ));

  context('check rendering', () => {
    it('verify Input', () => {
      expect(getByLabelText('할 일')).toBeVisible();
    });
    it('verify List', () => {
      //
    });
  });
  context('check click button', () => {
    //
  });
});
