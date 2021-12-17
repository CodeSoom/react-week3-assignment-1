import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  const value = '할 일이 없음';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  // 테스트가 실행되기 전에 실행
  beforeEach(() => {
    // mocking 함수들을 초기화
    jest.clearAllMocks();
  });

  it('renders input', () => {
    // Given
    const { container, getByLabelText, getByText } = renderInput();

    // Then
    expect(container).toHaveTextContent('할 일');
    expect(getByLabelText('할 일').value).toBe(value);
    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
  });

  describe('with same text', () => {
    it('not call onChange handler', () => {
      // Given
      const { getByLabelText } = renderInput();

      // When
      fireEvent.change(getByLabelText('할 일'), {
        target: { value },
      });

      // Then
      expect(handleChange).not.toBeCalled();
    });
  });

  describe('with change input', () => {
    it('call onChange handler', () => {
      // Given
      const { getByLabelText } = renderInput();

      // When
      fireEvent.change(getByLabelText('할 일'), {
        target: { value: '운동하기' },
      });

      // Then
      expect(handleChange).toBeCalled();
    });
  });

  describe('when click add button', () => {
    it('call onClick handler', () => {
      // Given
      const { getByText } = renderInput();

      // When
      fireEvent.click(getByText('추가'));

      // Then
      expect(handleClick).toBeCalled();
    });
  });
});
