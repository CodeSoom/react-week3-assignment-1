import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  context('without value', () => {
    const value = '';

    it('"할 일을 입력해주세요" placeholder 확인', () => {
      const { getByPlaceholderText } = renderInput(value);

      getByPlaceholderText('할 일을 입력해 주세요');
    });

    it('input change 이벤트 테스트', () => {
      const { getByRole } = renderInput(value);

      expect(handleChange).not.toBeCalled();

      fireEvent.change(
        getByRole('textbox'),
        { target: { value: 'any' } },
      );

      expect(handleChange).toBeCalledTimes(1);
    });

    it('"추가" 버튼 클릭 테스트', () => {
      const { getByText } = renderInput(value);

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context('with value', () => {
    const value = 'some text';

    it('value값이 입력된 값과 동일한 input 확인', () => {
      const { getByDisplayValue } = renderInput(value);

      getByDisplayValue(value);
    });
  });
});
