import React from 'react';
import { screen, fireEvent, render, getByRole } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const value = '할 일';
  const onClick = jest.fn();
  const onChange = jest.fn();

  it('Has label, input, button', () => {
    const { getByText, getByPlaceholderText } = render(<Input />);
    getByText('할 일');
    getByPlaceholderText('할 일을 입력해 주세요');
    getByText('추가');
  });

  it('Change input value', () => {
    const { container } = render(<Input onChange={onChange} />);
    const input = getByRole(container, 'textbox');
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.change(input, {
      target: { value: 'TDD 배우기' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('TDD 배우기');
  });

  it('Calls onClicks and clears input value', () => {
    const { container } = render(
      <Input onChange={onChange} onClick={onClick} />
    );
    const button = getByRole(container, 'button');
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    const input = getByRole(container, 'textbox');
    expect(input).toHaveValue('');
  });
});
