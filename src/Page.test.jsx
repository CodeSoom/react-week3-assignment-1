import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page 컴포넌트는', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();
  const taskTitle = '할 일 제목';
  const tasks = [
      {
        id: 1,
        title: '사골국물 마시기',
      },
      {
        id: 2,
        title: '푹 자기'
      }
    ];

    it('Input 컴포넌트와 List컴포넌트를 보여준다.', () => {
      const { container, getByText } = render((
        <Page
          value={taskTitle}
          onChange={onChangeTitle}
          onClick={onClickAddTask}
          tasks={tasks}
          onClickDelete={onClickDeleteTask}
        />
      ));
    
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('사골국물 마시기');
      expect(container).toHaveTextContent('푹 자기');
      expect(container).toHaveTextContent('완료');
    });
});
