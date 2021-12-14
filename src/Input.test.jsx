import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('render label', () => {
    const { container } = render(<Input />);

    expect(container).toHaveTextContent('할 일');
  });

  it('show value', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Input value="일어나기" onChange={handleChange} />
    );

    expect(getByRole('textbox').value).toBe('일어나기');
  });

  it('call handleChange', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Input value="" onChange={handleChange} />);

    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
    expect(handleChange).toBeCalled();
  });

  it('call handleClick', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Input onClick={handleClick} />);

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
