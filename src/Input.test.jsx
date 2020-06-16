import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input Component는', () => {
  const mockOnChange = jest.fn();
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnClick.mockClear();
  });

  describe('value 값이', () => {
    describe('비어 있다면', () => {
      test('입력 안내 메시지를 출력한다', () => {
        const placeholderText = '할 일을 입력해 주세요';
        const value = '';

        render(<Input
          value={value}
          onChange={mockOnChange}
          onClick={mockOnClick}
        />);

        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
      });
    });
    describe('비어 있지 않다면', () => {
      test('value 값을 출력한다.', () => {
        const value = '어제보다 열심히 하기';

        render(<Input
          value={value}
          onChange={mockOnChange}
          onClick={mockOnClick}
        />);

        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
      });
    });
  });

  describe('텍스트를 입력하면', () => {
    test('onChange를 실행한다', () => {
      const inputValue = '오늘보다 열심히 하기';

      render(<Input
        value=""
        onChange={mockOnChange}
        onClick={mockOnClick}
      />);
      fireEvent.change(screen.getByLabelText(/할 일/i, { selector: 'input' }),
        { target: { value: inputValue } });

      expect(mockOnChange).toBeCalledTimes(1);
    });
  });

  describe('추가 버튼을 누르면', () => {
    test('onClick을 실행한다', () => {
      render(<Input
        value="어제보다 열심히 하기"
        onChange={mockOnChange}
        onClick={mockOnClick}
      />);
      fireEvent.click(screen.getByRole('button', { name: /추가/i }));

      expect(mockOnClick).toBeCalledTimes(1);
    });
  });
});
