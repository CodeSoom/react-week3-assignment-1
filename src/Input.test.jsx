import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('it shows start page', () => {
    const { getByLabelText, getByText, getByPlaceholderText } = renderInput('');

    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });

  it('it listens changes', () => {
    const newTask = '새로 할 일';

    const { getByPlaceholderText } = renderInput(newTask);

    const defaultTask = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(defaultTask, { target: { value: newTask } });

    expect(defaultTask).toHaveValue(newTask);
  });

  it('it works click button', () => {
    const newTask = '새로운 할 일';

    const { getByText } = renderInput(newTask);

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
