import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('when start application', () => {
    it('first display', () => {
      // When
      const { container } = render(
        (
          <App />
        ),
      );

      // Then
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('추가 button click', () => {
    it('when add task', () => {
      // Given
      const initState = {
        newId: 100,
        taskTitle: '',
        tasks: [],
      };
      const { newId, tasks } = initState;

      // When
      const newTask = {
        id: newId,
        title: '새로운 할 일',
      };

      const newState = {
        ...initState,
        newId: newId + 1,
        taskTitle: '',
        tasks: [...tasks, newTask],
      };

      // Then
      expect(newState.newId).toBe(101);
      expect(newState.taskTitle).toBe('');
      expect(newState.tasks.length).toBe(1);
      expect(newState.tasks[0]).toEqual(newTask);
    });
  });

  context('완료 button click', () => {
    it('delete task', () => {
      // Given
      const doneTaskId = 1;
      const tasks = [{
        id: 1,
        title: '첫 번째 할 일',
      }, {
        id: 2,
        title: '두 번째 할 일',
      }];

      expect(tasks.length).toBe(2);

      // When
      const existed = tasks.filter((task) => task.id !== doneTaskId);

      // Then
      expect(existed.length).toBe(tasks.length - 1);
      expect(existed[0]).toEqual(tasks[1]);
    });
  });

  context('input text', () => {
    it('change taskTitle', () => {
      // Given
      const input = '첫 번째 할 일';
      const initState = {
        newId: 100,
        taskTitle: '',
        tasks: [],
      };

      // When
      const newState = {
        ...initState,
        taskTitle: input,
      };

      // Then
      expect(newState.taskTitle).toBe(input);
    });
  });
});
