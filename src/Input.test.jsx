import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

function setup(value, handleChange, handleClick) {
  render(<Input
    value={value}
    onChange={handleChange}
    onClick={handleClick}
  />);
  const changeTaskInput = (text) => fireEvent.change(screen.getByLabelText(/할 일/i, { selector: 'input' }),
    { target: { value: text } });
  const clickAddButton = () => fireEvent.click(screen.getByRole('button', { name: /추가/i }));
  return {
    changeTaskInput,
    clickAddButton,
  };
}

describe('Input Component는', () => {
  const mockHandleChange = jest.fn();
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
    mockHandleClick.mockClear();
  });

  describe('value 값이', () => {
    describe('비어 있다면', () => {
      test('입력 안내 메시지를 출력한다', () => {
        const placeholderText = '할 일을 입력해 주세요';
        setup('', mockHandleChange, mockHandleClick);
        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
      });
    });
    describe('비어 있지 않다면', () => {
      test('value 값을 출력한다.', () => {
        const value = '어제보다 열심히 하기';
        setup(value, mockHandleChange, mockHandleClick);
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
      });
    });
  });

  describe('텍스트를 입력하면', () => {
    test('onChange를 실행한다', () => {
      const { changeTaskInput } = setup('어제보다 열심히 하기', mockHandleChange, mockHandleClick);
      changeTaskInput('새롭게 해야할 일');
      expect(mockHandleChange).toBeCalledTimes(1);
    });
  });

  describe('추가 버튼을 누르면', () => {
    test('onClick을 실행한다', () => {
      const { clickAddButton } = setup('어제보다 열심히 하기', mockHandleChange, mockHandleClick);
      clickAddButton();
      expect(mockHandleClick).toBeCalledTimes(1);
    });
  });
});
