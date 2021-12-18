import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const renderComponent = ({ value = '' }) => render(
    <Input value={value} onClick={handleClick} onChange={handleChange} />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render label', () => {
    const { container } = renderComponent({ value: '' });

    expect(container).toHaveTextContent('할 일');
  });

  it('show value', () => {
    const { getByRole } = renderComponent({ value: '일어나기' });

    expect(getByRole('textbox').value).toBe('일어나기');
  });

  it('call handleChange when change text', () => {
    const { getByRole } = renderComponent({ value: '' });

    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
    expect(handleChange).toBeCalled();
  });

  it('call handleClick when click add button', () => {
    const { getByText } = renderComponent({ value: '' });

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
