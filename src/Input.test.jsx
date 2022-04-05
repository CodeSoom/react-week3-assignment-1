import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onClick = jest.fn();
  const onChange = jest.fn();
  const container = render(<Input onChange={onChange} onClick={onClick} />);
  const input = container.getByLabelText('할 일');
  const button = container.getByText('추가');

  it('renders input, button', () => {
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
