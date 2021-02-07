import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const value = '';

  function renderInput() {
    return render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  }

  it('renders labels and change event', () => {
    const { container, queryByLabelText } = renderInput();

    expect(container).toHaveTextContent('할 일');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(queryByLabelText('할 일'), {
      target: { value: '아무 것도 안하기' },
    });

    expect(handleChange).toBeCalled();
  });

  it('listens click event', () => {
    const { getByText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
