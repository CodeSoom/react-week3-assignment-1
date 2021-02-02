import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page shows tasks and input form', () => {
  const tasks = [
    {
      id: 1,
      title: '아무것도 하지 않기 #1',
    },
    {
      id: 2,
      title: '아무것도 하지 않기 #2',
    },
  ];

  const { container } = render(
    <Page
      tasks={tasks}
    />,
  );

  expect(container).toHaveTextContent('할 일');

  expect(container).toHaveTextContent('아무것도 하지 않기 #1');
  expect(container).toHaveTextContent('아무것도 하지 않기 #2');
});

test('Page shows no task message and input form', () => {
  const tasks = [];

  const { container } = render(
    <Page
      tasks={tasks}
    />,
  );

  expect(container).toHaveTextContent('할 일');

  expect(container).toHaveTextContent('할 일이 없어요!');
});
