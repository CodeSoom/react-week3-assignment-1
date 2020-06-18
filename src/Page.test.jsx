import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [];

  const { container } = render((
    <Page
      tasks={tasks}
    />
  ));

  expect(container).toContainHTML('<h1>To-do</h1>');
  expect(container).toHaveTextContent('할 일이 없어요!');
});
