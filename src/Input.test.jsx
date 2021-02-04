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
let handleChangeInput;
let handleClickAddTask;

beforeEach(() => {
  handleChangeInput = jest.fn();
  handleClickAddTask = jest.fn();
});

describe('Input', () => {
  const value = '';

  const renderInput = () => render((
    <Input
      value={value}
      onChange={handleChangeInput}
      onClick={handleClickAddTask}
    />
  ));

  context('without value', () => {
    it('renders placeholder', () => {
      const { getByLabelText } = renderInput();

      expect(getByLabelText('할 일')).toBeInTheDocument();
    });
  });

  context('with value', () => {
    it('listens change event', () => {
      const { getByLabelText, getByText } = renderInput();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트하기' } });

      expect(handleChangeInput).toBeCalled();

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });

    it('listens "추가" button click event', () => {
      const { getByText } = renderInput();

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });
});
