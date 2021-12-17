import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const renderComponent = ({ value = '' }) => render(
    <Input value={value} onClick={handleClick} onChange={handleChange} />,
  );

  beforeEach(() => {
    handleChange.mockClear();
    handleClick.mockClear();
  });

  it('render label', () => {
    const { container } = renderComponent({ value: '' });

    expect(container).toHaveTextContent('할 일');
  });

  it('show value', () => {
    const { getByRole } = renderComponent({ value: '일어나기' });

    expect(getByRole('textbox').value).toBe('일어나기');
  });

  it('call handleChange', () => {
    const { getByRole } = renderComponent({ value: '' });

    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
    expect(handleChange).toBeCalled();
  });

  it('call handleClick', () => {
    const { getByText } = renderComponent({ value: '' });

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
