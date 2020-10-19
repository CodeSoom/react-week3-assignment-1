import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  const renderInput = (value) => render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />));

  context('텍스트 입력할 때', () => {
    it('onChange 함수가 호출됨', () => {
      const { getByLabelText } = renderInput();

      expect(handleChange).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '뭐라도 하자' } });

      expect(handleChange).toBeCalledWith(expect.anything());
    });

    it('input value 값이 텍스트 입력대로 바뀌었는지 확인', () => {
      const { getByLabelText } = renderInput('뭐라도 하자');

      expect(getByLabelText('할 일').value).toBe('뭐라도 하자');
    });
  });

  context('추가 버튼을 클릭 했을 때', () => {
    it('onClick 함수가 호출됨', () => {
      const { getByText } = renderInput();

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalledWith(expect.anything());
    });

    it('input value 초기화시킴', () => {
      const { getByLabelText } = renderInput();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '' } });
    });

    it('input value 초기화되었는지 확인', () => {
      const { getByLabelText } = renderInput('');

      expect(getByLabelText('할 일').value).toBe('');
    });
  });
});
