import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('listens change event', () => {
    renderInput();

    const input = screen.getByPlaceholderText(/할 일을 입력/);

    userEvent.type(input, 'something');

    expect(handleChange).toBeCalled();
  });

  it('listens click event', () => {
    renderInput();

    const addButton = screen.getByText('추가');

    userEvent.click(addButton);

    expect(handleClick).toBeCalledTimes(1);
  });
});
