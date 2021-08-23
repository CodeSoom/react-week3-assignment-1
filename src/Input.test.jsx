import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onClick = jest.fn();

  const { getByText } = render(<Input
    onClick={onClick}
  />);

  fireEvent.click(getByText('추가'));
  expect(onClick).toHaveBeenCalled();
});
