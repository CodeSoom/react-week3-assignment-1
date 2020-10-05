import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input Component test', () => {
  it('renders label, button text', () => {
    const { container } = render((
      <Input />
    ));

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });
});
