import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('it shows start page', () => {
    const { getByText } = render(<App />);

    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
