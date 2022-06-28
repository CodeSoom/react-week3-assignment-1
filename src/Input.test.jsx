import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input', () => {
  let value;
  let onChange;
  let onClick;
  let input;
  let button;
  beforeEach(() => {
    value = '테스트';
    onChange = jest.fn();
    onClick = jest.fn();

    render(<Input value={value} onClick={onClick} onChange={onChange} />);

    input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    button = screen.getByRole('button');
  });

  it('init', async () => {
    expect(input).toHaveValue('테스트');
  });

  it('button click', async () => {
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('value change', async () => {
    await userEvent.type(input, '1');
    await userEvent.type(input, '12');
    await userEvent.type(input, '123');
    expect(onChange).toHaveBeenCalledTimes(6);
  });
});
