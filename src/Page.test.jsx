import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('without tasks', () => {
    it('default display', () => {
      // Given
      const taskTitle = '';
      const onChangeTitle = jest.fn();
      const onClickAddTask = jest.fn();
      const tasks = [];
      const onClickDeleteTask = jest.fn();

      // When
      const { container } = render(
        (<Page
          taskTitle={taskTitle}
          onChangeTitle={onChangeTitle}
          onClickAddTask={onClickAddTask}
          tasks={tasks}
          onClickDeleteTask={onClickDeleteTask}
        />),
      );

      // Then
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('display tasks', () => {
      // Given
      const taskTitle = '';
      const onChangeTitle = jest.fn();
      const onClickAddTask = jest.fn();
      const tasks = [{
        id: 1,
        title: '첫 번째 할 일',
      }];
      const onClickDeleteTask = jest.fn();

      // When
      const { container } = render(
        (<Page
          taskTitle={taskTitle}
          onChangeTitle={onChangeTitle}
          onClickAddTask={onClickAddTask}
          tasks={tasks}
          onClickDeleteTask={onClickDeleteTask}
        />),
      );

      // Then
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('첫 번째 할 일');
      expect(container).toHaveTextContent('완료');
    });
  });

  context('with taskTitle', () => {
    it('display input', () => {
      // Given
      const taskTitle = '두 번째 할 일';
      const onChangeTitle = jest.fn();
      const onClickAddTask = jest.fn();
      const tasks = [{
        id: 1,
        title: '첫 번째 할 일',
      }];
      const onClickDeleteTask = jest.fn();

      // When
      const { getByLabelText } = render(
        (<Page
          taskTitle={taskTitle}
          onChangeTitle={onChangeTitle}
          onClickAddTask={onClickAddTask}
          tasks={tasks}
          onClickDeleteTask={onClickDeleteTask}
        />),
      );

      // Then
      const input = getByLabelText('할 일');

      expect(input.value).toBe(taskTitle);
    });
  });
});
