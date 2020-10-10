import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const handleChange = jest.fn();
const handleClick = jest.fn();

describe('<Input />', () => {
  it('has input and a button', () => {
    const { getByPlaceholderText } = render(<Input />);
    getByPlaceholderText('할 일을 입력해 주세요');
  });

  it('changes input', () => {
    const { getByPlaceholderText } = render(
      <Input
        onChange={handleChange}
      />,
    );
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(input).toHaveDisplayValue('');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, {
      target: {
        value: 'TDD 연습',
      },
    });

    expect(handleChange).toBeCalled();
    expect(input).toHaveDisplayValue('TDD 연습');
  });

  it('Click button', () => {
    const { getByText } = render((
      <Input
        onClick={handleClick}
      />
    ));

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
