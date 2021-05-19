import {
  screen, render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  let value = '';

  const onChange = jest.fn((e) => {
    value = e.target.value;
  });

  it('renders label, input, button', () => {
    render(<Input />);

    screen.getByRole('textbox', { name: /할 일/ });
    screen.getByRole('button', { name: /추가/ });
  });

  it('changes input', () => {
    const { rerender } = render(<Input value={value} onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: /할 일/ });

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    rerender(<Input value={value} onChange={onChange} />);

    expect(onChange).toBeCalled();
    expect(input).toHaveAttribute('value', '뭐라도 하기');
  });

  it('calls onClick when click button', () => {
  });
});
