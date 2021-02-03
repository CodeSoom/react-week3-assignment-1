import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';
import List from './List';

test('Page', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  }];
  const taskTitle = '';

  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const { container, getByText } = render((
    <div>
      <h1>To-do</h1>
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
      <List
        tasks={tasks}
        onClickDelete={onClickDeleteTask}
      />
    </div>
  ));

  expect(container).toHaveTextContent('뭐라도 하기');

  expect(onClickDeleteTask).not.toBeCalled();
  fireEvent.click(getByText('완료'));
  expect(onClickDeleteTask).toBeCalledWith(1);

  expect(onClickAddTask).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(onClickAddTask).toBeCalled();
});
