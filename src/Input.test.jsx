import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const value = '';
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { getByPlaceholderText } = render((<Input
    value={value}
    onChange={onChange}
    onClick={onClick}
  />));

  it('If Input change then onChange function occur?', () => {
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: '누워있기',
      },
    });
    expect(input).toHaveAttribute('value', '누워있기');
  });
});
