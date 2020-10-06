import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  context('초기 화면일 때', () => {
    it('라벨과 인풋과 버튼이 화면에 보인다.', () => {
      const value = '';

      const { container, getByRole } = render((
        <Input value={value} onChange={handleChange} onClick={handleClick} />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      getByRole('textbox');
    });

    it('인풋창에 value가 빈값으로 나타난다.', () => {
      const value = '';

      const { getByPlaceholderText } = render((
        <Input value={value} onChange={handleChange} onClick={handleClick} />
      ));

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue('');
    });
  });

  context('인풋에 문자를 입력할 때마다', () => {
    it('handleChange 함수가 실행된다', () => {
      const value = '';

      const { getByPlaceholderText } = render((
        <Input value={value} onChange={handleChange} onClick={handleClick} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value: '입력한 문자' } });

      expect(handleChange).toBeCalled();
    });

    it('value값을 받아서 input에 표기한다', () => {
      const value = '입력한 문자';

      const { getByPlaceholderText } = render((
        <Input value={value} onChange={handleChange} onClick={handleClick} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveDisplayValue('입력한 문자');
    });
  });

  context('추가버튼을 클릭하면', () => {
    it('handleClick 함수가 실행된다', () => {
      const value = 'task 타이틀';

      const { getByText } = render((
        <Input value={value} onChange={handleChange} onClick={handleClick} />
      ));

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });

    it('인풋 value가 초기화된다.', () => {
      const value = 'task 타이틀';

      const { getByPlaceholderText, getByText } = render((
        <Input value={value} onChange={handleChange} onClick={handleClick} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveDisplayValue('task 타이틀');

      fireEvent.click(getByText('추가'));

      expect(input).toHaveDisplayValue('');
    });
  });
});
