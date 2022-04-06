import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const value = '테스트 입력';

  beforeEach(() => {
    handleChange.mockClear();
    handleClick.mockClear();
  });

  it('Input Change', () => {
    const { getByRole } = render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    fireEvent.change(getByRole('textbox'), { target: { value: '가나다' } });
    expect(handleChange).toBeCalledTimes(1);
  });

  it('Input Click', () => {
    const { container, getByText } = render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    expect(container).toHaveTextContent('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalledTimes(1);
  });
});
