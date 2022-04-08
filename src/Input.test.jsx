import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const value = '테스트 입력';
  const renderInput = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  beforeEach(() => {
    handleChange.mockClear();
    handleClick.mockClear();
  });

  it('Input Change', () => {
    const { getByRole } = renderInput;

    fireEvent.change(getByRole('textbox'), { target: { value: '가나다' } });
    expect(handleChange).toBeCalledTimes(1);
  });

  it('Input Click', () => {
    const { getAllByRole } = renderInput;

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getAllByRole('button')[0]);

    expect(handleClick).toBeCalledTimes(1);
  });
});
