import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const value = '아무것도 하지 않기';
  const placeHolder = '할 일을 입력해 주세요';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent() {
    return render(
      <Input value="" onChange={handleChange} onClick={handleClick} />,
    );
  }

  it('render', () => {
    const { container, getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText(placeHolder);

    expect(container).toHaveTextContent('할 일');
    expect(input).toBeInTheDocument(placeHolder);
    expect(input).toHaveAttribute('value', '');
    expect(container).toHaveTextContent('추가');
  });

  it('call onChange', () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText(placeHolder);

    fireEvent.change(input, {
      target: {
        value,
      },
    });

    expect(handleChange).toBeCalled();
  });

  it('call onClick', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText(/추가/));

    expect(handleClick).toBeCalled();
  });
});
