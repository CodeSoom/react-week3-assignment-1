import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const handleOnChangeTitle = jest.fn();
  const handleOnClickAddTask = jest.fn();

  context('사용자가 할 일을 입력하면', () => {
    it('input 값이 해당 글자로 값이 바뀐다.', () => {
      const taskTitle = undefined;

      const container = render(
        <Input
          value={taskTitle}
          onChange={handleOnChangeTitle}
          onClick={handleOnClickAddTask}
        />,
      );

      expect(handleOnChangeTitle).not.toBeCalled();
      fireEvent.change(container.getByLabelText('할 일'), {
        target: {
          value: '바뀐다',
        },
      });
      expect(handleOnChangeTitle).toBeCalledTimes(1);
      expect(container.getByLabelText('할 일').value).toBe('바뀐다');
    });
  });
  context('사용자가 할 일을 입력한 후 추가를 누르면', () => {
    it('input의 텍스트가 지워진다.', () => {
      const taskTitle = 'a';

      const container = render(
        <Input
          value={taskTitle}
          onChange={handleOnChangeTitle}
          onClick={handleOnClickAddTask}
        />,
      );

      expect(container.getByLabelText('할 일').value).toBe('a');

      expect(handleOnClickAddTask).not.toBeCalled();
      fireEvent.click(container.getByText('추가'));
      expect(handleOnClickAddTask).toBeCalledTimes(1);

      expect(
        container.getByPlaceholderText('할 일을 입력해 주세요'),
      ).toBeInTheDocument();
    });
  });
});
