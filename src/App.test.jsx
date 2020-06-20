import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App handleChange', () => {
  context('when type in task', () => {
    it('display it on input field', () => {
      const TASK = '테스트';
      const handleChangeTitle = jest.fn();

      const { getByPlaceholderText } = render((
        <App
          onChangeTitle={handleChangeTitle}
          tasks={[]}
        />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: TASK } });

      expect(input.value).toBe(TASK);
    });
  });
});

describe('App handleClickAdd', () => {
  context('when click add', () => {
    it('display it on the List', () => {
      const TASK = '테스트';
      const handleClickAddTask = jest.fn();

      const { container, getByText } = render((
        <App
          onClickAddTask={handleClickAddTask}
        />
      ));

      const input = container.querySelector('#input-task-title');
      fireEvent.change(input, { target: { value: TASK } });
      expect(input.value).toBe(TASK);

      expect(handleClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));

      expect(container).not.toHaveTextContent('할 일이 없어요!');
      expect(container).toHaveTextContent(TASK);
    });
  });
});
