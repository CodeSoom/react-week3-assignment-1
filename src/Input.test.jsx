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

  function renderInput() {
    return render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  }

  it('Input Change', () => {
    const { getByRole } = renderInput();

    fireEvent.change(getByRole('textbox'), { target: { value: '가나다' } });
    expect(handleChange).toBeCalledTimes(1);
  });

  it('Input Click', () => {
    const { getAllByText } = renderInput();
    const buttons = getAllByText('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(buttons[0]);

    expect(handleClick).toBeCalledTimes(1);
  });
});
