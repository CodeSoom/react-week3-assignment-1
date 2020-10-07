import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('renders Input', () => {
    const { container } = render((<Input />));
    expect(container).toContainHTML('<p');

    expect(container).toContainHTML('<label');
    expect(container).toHaveTextContent('할 일');

    expect(container).toContainHTML('<input');

    expect(container).toContainHTML('<button');
    expect(container).toHaveTextContent('추가');
  });
});
