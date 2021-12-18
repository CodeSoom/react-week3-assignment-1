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

  const renderPage = (tasks) => render((
    <Page
      taskTitle={tasks.title}
      tasks={tasks}
      onChangeTitle={handleClick}
      onClickAddTask={handleClick}
      onClickDeleteTask={handleClick}
    />
  ));

  it('Page컴포넌트를 불러온다', () => {
    const { container } = renderPage(data);

    expect(container).toHaveTextContent('뭐라도 하기');
  });
});
