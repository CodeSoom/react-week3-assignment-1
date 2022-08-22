import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input component', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const setup = (value = '') => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  const text = '코드숨 리액트 11기 화이팅!';

  it('renders input & button', () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByText('추가')).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');
  });

  it('renders input to listen to change event', () => {
    const { getByPlaceholderText } = setup();

    expect(handleChange).not.toBeCalled();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: text } });

    expect(handleChange).toBeCalled();
  });

  it('renders input set value', () => {
    const { getByPlaceholderText } = setup(text);

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(text);
  });

  it('renders button to listen to click event', () => {
    const { getByText } = setup();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });
});
