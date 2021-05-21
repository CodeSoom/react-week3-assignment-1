import {
  screen, render, fireEvent,
} from '@testing-library/react';

import Input from '../../components/Input';

describe('<Input />', () => {
  function setup(props = {}) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<Input {...props} />);
  }

  it('renders label, input, button', () => {
    setup();

    screen.getByLabelText('할 일');
    screen.getByRole('button', { name: '추가' });
  });

  it('calls onChange when change value', () => {
    const onChange = jest.fn();

    setup({ onChange });

    const input = screen.getByLabelText('할 일');

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(onChange).toBeCalled();
  });

  it('calls onClick when click button', () => {
    const onClick = jest.fn();

    setup({ onClick });

    fireEvent.click(screen.getByRole('button', { name: '추가' }));

    expect(onClick).toBeCalled();
  });
});
