import React from 'react';
import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const { container } = render(
    <Page />,
  );
  expect(container).toHaveTextContent('To-do');

  context('task가 없을 경우', () => {

  });

  context('task가 있을 경우', () => {

  });
});
