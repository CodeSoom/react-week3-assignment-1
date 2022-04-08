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
  it("'할 일' 텍스트 출력", () => {
    const { container } = setup();
    expect(container).toHaveTextContent('할 일');
  });

  it("'추가' 버튼 클릭", () => {
    const { handleClick, getByText } = setup();
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it('input에 텍스트 입력 테스트', async () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: '할일이 없어' } });
    expect(input.value).toBe('할일이 없어');

    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });

  it('input에 값 입력 후 추가 클릭 시 input에 값 제거', () => {
    const { input, handleClick, getByText } = setup();
    expect(handleClick).not.toBeCalled();

    fireEvent.change(input, { target: { value: '할일이 없어' } });
    expect(input.value).toBe('할일이 없어');

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();

    expect(input.value).toBe('');
  });

  it('input에 placeholder 테스트', async () => {
    const { input } = setup();
    expect(input.getAttribute('placeholder')).toBe('할 일을 입력해 주세요');
  });
});
