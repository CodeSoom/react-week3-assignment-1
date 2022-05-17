import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value = '') => render(
    <Input value={value} onChange={handleChange} onClick={handleClick} />,
  );

  it("'할 일'이 출력되어야 한다", () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
  });

  it("input 태그 placeholder에 '할 일을 입력해 주세요'가 출력되어야 한다.", () => {
    const { getByLabelText } = renderInput();

    expect(getByLabelText('할 일').getAttribute('placeholder')).toBe(
      '할 일을 입력해 주세요',
    );
  });

  context('입력창에 입력할 때', () => {
    it('mockChange 함수가 실행되어야 한다.', () => {
      const { getByPlaceholderText } = renderInput();

      expect(handleChange).not.toBeCalled();

      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: '테스트' },
      });
      expect(handleChange).toBeCalled();
    });

    it('원하는 값이 입력되어야 한다', () => {
      const expectValue = '테스트';
      const { getByRole } = renderInput(expectValue);

      const result = getByRole('textbox');

      expect(result).toHaveValue(expectValue);
    });
  });

  context('추가 버튼을 눌렀을 때', () => {
    it('mockClick 함수가 실행되어야 한다.', () => {
      const { getByText } = renderInput();

      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });

    it('input창이 초기화 되어야 한다.', () => {
      const { getByRole, getByText } = renderInput();

      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: '테스트' } });
      fireEvent.click(getByText('추가'));
      expect(input.value).toBe('');
    });
  });
});
