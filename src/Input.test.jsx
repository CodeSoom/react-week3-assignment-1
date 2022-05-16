import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const mockChange = jest.fn();
  const mockClick = jest.fn();

  function renderInput(value = '') {
    return render(
      <Input value={value} onChange={mockChange} onClick={mockClick} />,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("1. '할 일'이 출력되어야 한다", () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
  });

  it("2. input 태그 placeholder에 '할 일을 입력해 주세요'가 출력되어야 한다.", () => {
    const { getByLabelText } = renderInput();

    expect(getByLabelText('할 일').getAttribute('placeholder')).toBe(
      '할 일을 입력해 주세요',
    );
  });

  context('3. 입력창에 입력할 때', () => {
    it('3.1. mockChange 함수가 실행되어야 한다.', () => {
      const { getByPlaceholderText } = renderInput();

      expect(mockChange).not.toBeCalled();

      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: '테스트' },
      });
      expect(mockChange).toBeCalled();
    });

    it('3.2. 원하는 값이 입력되어야 한다', () => {
      const expectValue = '테스트';
      const { getByRole } = renderInput(expectValue);

      const result = getByRole('textbox');

      expect(result).toHaveValue(expectValue);
    });
  });

  context('4. 추가 버튼을 눌렀을 때', () => {
    it('4.1. mockClick 함수가 실행되어야 한다.', () => {
      const { getByText } = renderInput();

      expect(mockClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(mockClick).toBeCalled();
    });

    it('4.2. input창이 초기화 되어야 한다.', () => {
      const { getByRole, getByText } = renderInput();

      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: '테스트' } });
      fireEvent.click(getByText('추가'));
      expect(input.value).toBe('');
    });
  });
});
