import {
  render, fireEvent, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });

  it('handles `onClick` function passed as prop', () => {
    const onClick = jest.fn();

    const { getByText } = render(<Input
      onClick={onClick}
    />);

    expect(onClick).not.toHaveBeenCalled();

    fireEvent.click(getByText('추가'));

    expect(onClick).toHaveBeenCalled();
  });

  it('handles `onChange` function passed as prop', () => {
    const onChange = jest.fn();
    const onClick = jest.fn();

    const { getByLabelText } = render(<Input
      value="test"
      onClick={onClick}
      onChange={onChange}
    />);

    expect(onChange).not.toBeCalled();

    userEvent.type(getByLabelText('할 일'), 'test');

    expect(onChange).toBeCalled();
  });
});
