import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value = '') => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('renders label', () => {
    const { getByLabelText } = renderInput();

    expect(getByLabelText('할 일')).toBeInTheDocument();
  });

  it('renders input and "할일을 입력해 주세요" placeholder', () => {
    const { getByRole } = renderInput();

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
  });

  it('renders add button', () => {
    const { getByText } = renderInput();

    expect(getByText('추가')).toBeInTheDocument();
  });

  it('renders new value when change input', () => {
    const { getByRole } = renderInput();

    fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });
    expect(handleChange).toBeCalled();
  });

  it('renders empty input when click add', () => {
    const { getByRole, getByText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();

    expect(getByRole('textbox')).toHaveValue('');
  });
});
