import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const value = '아무것도 하지 않기';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render((
    <Input
      value=""
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('render', () => {
    const { container, getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(container).toHaveTextContent('할 일');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', '');
    expect(container).toHaveTextContent('추가');
  });

  it('when typing, call onChange', () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value,
      },
    });

    expect(handleChange).toBeCalled();
  });

  it('click "추가" button, call onClick', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText(/추가/));

    expect(handleClick).toBeCalled();
  });
});
