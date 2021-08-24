import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('handles `onClick` function passed as prop', () => {
    const onClick = jest.fn();

    const { getByText } = render(<Input
      onClick={onClick}
    />);

    expect(onClick).not.toHaveBeenCalled();

    fireEvent.click(getByText('추가'));

    expect(onClick).toHaveBeenCalled();
  });
});
