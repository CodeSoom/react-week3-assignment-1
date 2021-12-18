import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Component', () => {
  const handleClick = jest.fn();

  const data = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
  ];

  const renderList = (tasks) => render((
    <Page
      taskTitle, onChangeTitle, onClickAddTask,
  tasks, onClickDeleteTask
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  context('등록된 todo가 있을 경우', () => {
    it('등록된 todo가 있을 경우 목록을 보여준다', () => {
      const { container } = renderList(data);

      expect(container).toHaveTextContent('뭐라도 하기');
    });
  });

  context('등록된 todo가 없을 경우', () => {
    it('등록된 To-do가 없으면 "할 일이 없어요!" 메시지를 보여준다', () => {
      const { container } = renderList([]);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
