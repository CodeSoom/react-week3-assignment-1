import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  context('초기 화면일 때', () => {
    it('"할 일"이 화면에 보인다', () => {
      const value = '';

      const { container } = render((
        <Input value={value} />
      ));

      expect(container).toHaveTextContent('할 일');
    });

    it('인풋창이 화면에 보인다', () => {
      const value = '';

      const { getByPlaceholderText } = render((
        <Input value={value} />
      ));

      getByPlaceholderText('할 일을 입력해 주세요');
    });

    it('"추가"버튼이 화면에 보인다', () => {
      const value = '';

      const { container } = render((
        <Input value={value} />
      ));

      expect(container).toHaveTextContent('추가');
    });
  });

  context('인풋에 문자를 입력할 때', () => {
    it('handleChange함수가 실행된다', () => {
      const value = '';

      const { getByPlaceholderText } = render((
        <Input value={value} onChange={handleChange} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value: '입력한 문자' } });

      expect(handleChange).toBeCalled();
    });

    it('value값을 받아서 input에 표기한다', () => {
      const value = '입력한 문자';

      const { getByPlaceholderText } = render((
        <Input value={value} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveDisplayValue('입력한 문자');
    });
  });

  context('추가 버튼을 클릭하면', () => {
    it('handleClick함수가 실행된다', () => {
      const value = 'task 타이틀';

      const { getByText } = render((
        <Input value={value} onClick={handleClick} />
      ));

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });

    it('인풋창이 빈값으로 초기화된다.', () => {
      const value = '첫번째 할 일';

      const { getByPlaceholderText, getByText } = render((
        <Input value={value} onClick={handleClick} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveDisplayValue('첫번째 할 일');

      fireEvent.click(getByText('추가'));

      expect(input).toHaveDisplayValue('');
    });
  });
});
