import React from 'react';

import { render } from '@testing-library/react';

import Page from "./Page";

test('Page', () => {
  const tasks = [
    { id: 1, title: '멋대로 살기' },
  ];

  const { container } = render(
    <Page tasks={tasks}/>
  );

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('멋대로 살기');
  expect(container).toHaveTextContent('완료');
});