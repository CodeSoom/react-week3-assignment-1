import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트', () => {
  const handleAddText = jest.fn();
  const handleChangeText = jest.fn();
  const renderInput = render(
    <Input
      onClick={handleAddText}
      onChange={handleChangeText}
    />,
  );

  const { getByPlaceholderText } = renderInput;

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  context('최초 렌더링 되었을 때', () => {
    it('화면에 노출되어야 한다.', () => {
      expect(input).toBeInTheDocument();
    });

    it('빈 값으로 노출되어야 한다.', () => {
      expect(input.value).toBe('');
    });
  });

  context('글자를 입력하면', () => {
    const value = '새로운 값이에요';

    it('같은 글자를 화면에 노출시켜야 한다.', () => {
      fireEvent.change(input, { target: { value } });

      expect(input.value).toBe(value);
    });
  });

  context('버튼을 한 번 클릭하면', () => {
    const { getByRole } = renderInput;
    const button = getByRole('button', { name: '추가' });

    fireEvent.click(button);

    it('handleAddText가 한 번 실행되어야 한다.', () => {
      expect(handleAddText).toHaveBeenCalledTimes(1);
    });

    it('값이 초기화되어 빈 값으로 노출되어야 한다.', () => {
      const value = '';

      expect(input.value).toBe(value);
    });
  });
});
