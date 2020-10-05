import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input Component test', () => {
  const givenValue = '밥먹기';

  const { container, getByLabelText } = render((
    <Input value={givenValue} onChange={() => {}} />
  ));
  it('renders label, button text', () => {
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  const input = getByLabelText('할 일');

  it('renders given value on input', () => {
    expect(input).toHaveValue(givenValue);
  });
});
