import { render, screen, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByText } = render(
    <Input
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  context('with 추가 button clicked ', () => {
    fireEvent.click(getByText('추가'));

    it('handleClick called 1 time', () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  context('with value changed', () => {
    const inputNode = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputNode, { target: { value: '코드숨 과제하기' } });

    it('handleChange called with 코드숨 과제하기', () => {
      expect(handleChange).toBeCalledWith('코드숨 과제하기');
    });

    it('renders 코드숨 과제하기', () => {
      expect(inputNode.value).toBe('코드숨 과제하기');
    });
  });
});
