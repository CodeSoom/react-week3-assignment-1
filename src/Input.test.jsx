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

  it('renders label', () => {
    const { container } = renderComponent({ value: '' });

    expect(container).toHaveTextContent('할 일');
  });

  it('shows value', () => {
    const { getByRole } = renderComponent({ value: '일어나기' });

    expect(getByRole('textbox').value).toBe('일어나기');
  });

  context('when change text', () => {
    it('calls onChange', () => {
      const { getByRole } = renderComponent({ value: '' });

      fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
      expect(handleChange).toBeCalled();
    });
  });

  context('when click add button', () => {
    it('calls onClick', () => {
      const { getByText } = renderComponent({ value: '' });

      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });
  });
});
