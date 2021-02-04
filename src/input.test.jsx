import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  context('input이 비었을 시', () => {
    const value = '';

    it('placeholder에 "할 일을 입력해 주세요"가 나온다.', () => {
      const { getByLabelText } = render((
        <Input
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));
      expect(getByLabelText('할 일').placeholder).toEqual('할 일을 입력해 주세요');
    });
  });

  context('input의 value 값이 변경될 때', () => {
    const value = '엄준식은';

    it('handleChange가 동작한다.', () => {
      const { getByLabelText } = render((
        <Input
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(handleChange).not.toBeCalled();
      fireEvent.change(getByLabelText('할 일'),
        { target: { value: `${value} 살아있다` } });
      expect(handleChange).toBeCalled();
    });
  });

  context('input에 값을 넣고 추가 버튼을 눌렀을 때', () => {
    const value = '엄준식은 살아있다';

    it('input의 value 값은 사라진다.', () => {
      const { getByText, getByLabelText } = render((
        <Input
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
      expect(getByLabelText('할 일')).toHaveTextContent('');
    });
  });
});
