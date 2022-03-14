import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';
import { tasksFixture } from './Fixture';

describe('Page', () => {
  const handleClick = jest.fn();

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
    const { container } = renderPage(tasksFixture);

    expect(container).toHaveTextContent('뭐라도 하기');
  });
});
