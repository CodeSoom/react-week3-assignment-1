import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const renderPage = ({ taskTitle = '', tasks = [] }) => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />
  ));

  it('"To-do" 타이틀 확인', () => {
    const { getByText } = renderPage({});

    expect(getByText('To-do').nodeName).toBe('H1');
  });

  it('List 컴포넌트 "할 일이 없어요!" 확인', () => {
    const { getByText } = renderPage({});

    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });

  it('Input 컴포넌트 "할 일을 입력해주세요" placeholder 확인', () => {
    const { getByPlaceholderText } = renderPage({});

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });
});
