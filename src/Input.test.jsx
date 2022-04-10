import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function renderInput() {
    return render((
      <Input
        value=""
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and add button', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('calls handleChange', () => {
    const { getByRole } = renderInput();

    fireEvent.change(getByRole('textbox'), { target: { value: '신나게 놀기' } });

    expect(handleChange).toBeCalled();
  });

  it('calls handleClick', () => {
    const { getByText } = renderInput();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
