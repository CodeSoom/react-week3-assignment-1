import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  let handleChange;
  let handleClick;
  let renderComponent;

  beforeEach(() => {
    handleChange = jest.fn();
    handleClick = jest.fn();
    renderComponent = ({ value = '', onClick, onChange = handleChange } = { value: '', onChange: handleChange }) => render(<Input value={value} onClick={onClick} onChange={onChange} />);
  });

  it('render label', () => {
    const { container } = renderComponent();

    expect(container).toHaveTextContent('할 일');
  });

  it('show value', () => {
    const { getByRole } = renderComponent({ value: '일어나기' });

    expect(getByRole('textbox').value).toBe('일어나기');
  });

  it('call handleChange', () => {
    const { getByRole } = renderComponent({ value: '', onChange: handleChange });

    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
    expect(handleChange).toBeCalled();
  });

  it('call handleClick', () => {
    const { getByText } = renderComponent({ onClick: handleClick });

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
