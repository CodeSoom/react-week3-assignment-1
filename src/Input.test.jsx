import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  const testValue = '123';

  const renderInput = (value = '') => render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));

  beforeEach(() => jest.clearAllMocks());

  it('renders a input control', () => {
    const { getByLabelText } = renderInput();

    const { tagName } = getByLabelText('할 일');

    expect(tagName).toBe('INPUT');
  });

  it('clicks 추가 button in order to add tha value to task', () => {
    const { getByText } = renderInput();

    const addButton = getByText('추가');

    expect(onClick).not.toBeCalled();

    fireEvent.click(addButton);

    expect(onClick).toBeCalled();
  });

  it('calls onChange function in order to update the value', () => {
    const { getByLabelText } = renderInput(testValue);

    fireEvent.change(getByLabelText('할 일'), { target: { value: 'a' } });

    expect(onChange).toBeCalled();
  });

  context('without value', () => {
    const { getByLabelText } = renderInput();

    const { placeholder } = getByLabelText('할 일');

    expect(placeholder).toBe('할 일을 입력해 주세요');
  });
});
