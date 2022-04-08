import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import Input from './Input';

function TestInput({ onClick }) {
  const [value, setValue] = useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setValue('');
    onClick();
  };

  return (
    <Input
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      onClick={handleClick}
    />
  );
}

const setup = () => {
  const handleClick = jest.fn();
  const utils = render(<TestInput onClick={handleClick} />);
  const input = utils.getByPlaceholderText('할 일을 입력해 주세요');
  return {
    input,
    handleClick,
    ...utils,
  };
};

describe('Input', () => {
  it("1. '할 일' 텍스트 출력", () => {
    const value = '';
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const { container } = render(<Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />);
    expect(container).toHaveTextContent('할 일');
  });

  it("2. '추가' 버튼 클릭", () => {
    const value = '';
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const { getByText } = render(<Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />);
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it('3. input에 텍스트 입력 테스트', async () => {
    const value = '';
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const { getByPlaceholderText } = render(<Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />);

    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '할일이 없어' } });
    expect(handleChange).toBeCalled();
  });

  it('4. input에 placeholder 테스트', async () => {
    const value = '';
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const { getByPlaceholderText } = render(<Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />);
    expect(getByPlaceholderText('할 일을 입력해 주세요')
      .getAttribute('placeholder'))
      .toBe('할 일을 입력해 주세요');
  });
});
