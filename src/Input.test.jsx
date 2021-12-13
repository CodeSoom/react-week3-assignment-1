import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { getByText } = render((
    <Input
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  const button = getByText('추가');

  fireEvent.click(button);
});
