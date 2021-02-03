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
describe('Input', () => {
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

  context('without value', () => {
    it('has placeholder', () => {
      const { getByLabelText } = renderInput();

      expect(getByLabelText('할 일')).toBeInTheDocument();
    });
  });

  context('with value', () => {
    it('runs onChange function', () => {
      const { getByLabelText } = renderInput();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트하기' } });

      expect(handleChangeInput).toBeCalled();
    });

    it('clicking add button runs function', () => {
      const { getByText } = renderInput();

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });
});
