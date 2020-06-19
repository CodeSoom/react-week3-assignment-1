import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

// Write task then display it in the input field
describe('App handleChange', () => {
  context('when type in task', () => {
    it('display it on input field', () => {
      const handleChangeTitle = jest.fn();

      const { getByPlaceholderText } = render((
        <Page
          onChangeTitle={handleChangeTitle}
          tasks={[]}
        />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: '테스트' } });

      expect(input.value).toBe('테스트');
    });
  });
});

// Add task then display it on the list
describe('App handleClickAdd', () => {
  context('when click add', () => {
    it('display it on the List', () => {
      const TASK1 = 'item #1';

      const tasks = [{ id: 1, title: TASK1 }];
      const handleClickAddTask = jest.fn();

      const { container, getByText } = render((
        <Page
          tasks={tasks}
          onClickAddTask={handleClickAddTask}
        />
      ));

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalledTimes(1);

      expect(container).toHaveTextContent(TASK1);
    });
  });
});


// Click complete then remove from the list
describe('App handleClickDeleteTask', () => {
  context('when click complete', () => {
    it('remove it from the List', () => {
      const TASK1 = 'item #1';

      const tasks = [{ id: 1, title: TASK1 }];
      const handleClickDeleteTask = jest.fn();

      const { container, getByText } = render((
        <Page
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(handleClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClickDeleteTask).toHaveBeenCalledWith(tasks[0].id);

      expect(container).not.toHaveTextContent(TASK1);
    });
  });
});
