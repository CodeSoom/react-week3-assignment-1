import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const renderInput = (taskTitle) => (
    render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ))
  );

  context('랜더 확인', () => {
    it('인풋과 버튼 확인', () => {
      const taskTitle = '';
      const { getByText, getByPlaceholderText } = renderInput(taskTitle);
      expect(getByText('할 일')).toBeTruthy();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeTruthy();
      expect(getByText('추가')).toBeTruthy();
    });
  });

  context('할 일 추가하기', () => {
    it('입력하기', () => {
      const taskTitle = '';
      const { getByPlaceholderText } = renderInput(taskTitle);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveValue('');
      fireEvent.change(input, { target: { value: '뭐라도 하기' } });
      expect(onChangeTitle).toBeCalled();
    });

    it('추가 클릭, 인풋창 초기화', () => {
      const taskTitle = '뭐라도 하기';
      const { getByText } = renderInput(taskTitle);
      const button = getByText('추가');

      fireEvent.click(button);
      expect(onClickAddTask).toBeCalled();
    });
  });
});
