import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  const init = () => {
    const utils = render(<App />);
    return { ...utils };
  };

  test('has title label', () => {
    const { container } = init();
    expect(container);
  });
});
