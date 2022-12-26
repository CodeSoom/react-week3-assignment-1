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

  it('listens change input event', () => {
    const { getByRole } = renderInput();

    fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });
    expect(handleChange).toBeCalled();
  });

  it('listens click add event', () => {
    const { getByRole, getByText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();

    expect(getByRole('textbox')).toHaveValue('');
  });
});
