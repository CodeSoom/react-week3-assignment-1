import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Component', () => {
  const headingText = 'To-do';

  it('shows heading', () => {
    const { getByText } = render(<Page />);

    expect(getByText(headingText)).toBeInTheDocument();
  });
});
