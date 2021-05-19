import {
  screen, render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const onChange = jest.fn();

  it('renders label, input, button', () => {
    render(<Input />);

    screen.getByRole('textbox', { name: /할 일/ });
    screen.getByRole('button', { name: /추가/ });
  });

  it('changes input', () => {
    render(<Input onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: /할 일/ });

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(onChange).toBeCalled();
  });

  it('calls onClick when click button', () => {
  });
});
