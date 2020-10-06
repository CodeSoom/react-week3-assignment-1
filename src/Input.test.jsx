import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('<Input />', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('할 일 label을 출력한다.', () => {
      // When
      renderInput();

      // Then
      expect(screen.getByText('할 일')).toBeInTheDocument();
    });

    it('input을 출력한다.', () => {
      // When
      renderInput();

      // Then
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    });

    it('추가 button을 출력한다.', () => {
      // When
      renderInput();

      // Then
      expect(screen.getByRole('button')).toHaveTextContent('추가');
    });
  });

  describe('onClick', () => {
    context('할 일 label을 클릭했을 때', () => {
      it('input으로 focus된다.', () => {
        // Given
        renderInput();

        // When
        userEvent.click(screen.getByText('할 일'));

        // Then
        expect(screen.getByRole('textbox')).toHaveFocus();
      });
    });

    context('추가 button을 클릭했을 때', () => {
      it('onClick props가 호출된다.', () => {
        // Given
        renderInput();

        // When
        userEvent.click(screen.getByRole('button'));

        // Then
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('onChange', () => {
    context('input에 typing 했을 때', () => {
      it('onChange props가 호출된다.', () => {
        // Given
        renderInput();

        // When
        userEvent.type(screen.getByRole('textbox'), 'fix the bug');

        // Then
        expect(handleChange).toHaveBeenCalledTimes(11);
      });
    });
  });
});
