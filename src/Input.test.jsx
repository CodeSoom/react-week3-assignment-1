import { render, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input component', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderInputComponent = (value = '') =>
    render(
      <Input onChange={handleChange} onClick={handleClick} value={value} />
    );

  it("label tag text is '할 일'", () => {
    const { getByText } = renderInputComponent();
    expect(getByText('할 일')).toContainHTML('label');
  });

  it("button tag text is '추가' ", () => {
    const { getByText } = renderInputComponent();
    expect(getByText('추가')).toBeInTheDocument();
  });

  it('onChange event should be fired when value changed.', () => {
    const { getByPlaceholderText } = renderInputComponent();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: '23' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('value parameter should be changed', () => {
    const { getByDisplayValue } = renderInputComponent(24);
    expect(getByDisplayValue('24')).toBeInTheDocument();
  });

  it('onClick event should be fired when button clicked.', () => {
    const { getByText } = renderInputComponent();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
