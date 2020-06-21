import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  context('사용자가 "바뀐다"라는 할 일을 입력하면', () => {
    it('입력창에 "바뀐다"라는 문구 보인다.', () => {
      const { getByLabelText } = render(
        <Input onChange={handleChangeTitle} onClick={handleClickAddTask} />,
      );

      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: '바뀐다',
        },
      });

      expect(handleChangeTitle).toBeCalledTimes(1);

      expect(getByLabelText('할 일').value).toBe('바뀐다');
    });
  });
  context('사용자가 "추가될 할일"이라는 할 일을 추가하면', () => {
    it('할 일 입력창에는 "할 일을 입력해 주세요" 이라는 문구가 보인다.', () => {
      const { getByLabelText, getByText, getByPlaceholderText } = render(
        <Input
          value="추가될 할일"
          onChange={handleChangeTitle}
          onClick={handleClickAddTask}
        />,
      );

      expect(getByLabelText('할 일').value).toBe('추가될 할일');

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalledTimes(1);

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });
});
