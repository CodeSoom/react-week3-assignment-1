import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('<Input />', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  it('renders header', () => {
    const { getByText, getByDisplayValue, getByLabelText } = render(
      <Input
        value="기존 할 일"
        onChange={handleChange}
        onClick={handleClick}
      />,
    );
    expect(getByText(/할 일/)).not.toBeNull();
    expect(getByText(/추가/)).not.toBeNull();
    expect(getByDisplayValue(/기존 할 일/)).not.toBeNull();
    fireEvent.change(getByLabelText('할 일'), {
      target: { value: '무언가 하기' },
    });
    expect(handleChange).toBeCalled();
  });
});
