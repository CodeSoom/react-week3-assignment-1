import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

/**
 * 테스트 목록
 *
 * Input에
 *  value가 없을때
 *    placehoder에 "할 일을 입력해 주세요" 가 노출되는지
 *  value가 변경되었을때
 *    onChange 함수가 실행되는지
 *  button을 클릭했을때
 *   onClick 함수가 실행되는지
 */
const handleChangeInput = jest.fn();
const handleClickAddTask = jest.fn();
const value = '';

const renderInput = () => render(
  <Input
    value={value}
    onChange={handleChangeInput}
    onClick={handleClickAddTask}
  />,
);

describe('Input', () => {
  context('without value', () => {
    it('placeholder is displayed', () => {
      const { getByPlaceholderText } = renderInput();

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('with value change', () => {
    it('onChange function run', () => {
      const { getByPlaceholderText } = renderInput();

      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '홈트하기' } });

      expect(handleChangeInput).toBeCalled();

      /**
       * 질문) 이부분에서 handleChangeInput가 실행되었을때 `input`의 `value`로 `홈트하기`가
       * 들어오는것은 `state` 관련된 것이므로 `Input`에서 테스트할 필요가 없나요?
       *
      */
    });
  });

  context('When the button is clicked', () => {
    it('onClick function run', () => {
      const { getByText } = renderInput();

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });
});
