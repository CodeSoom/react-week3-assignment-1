import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [];

  const { container } = render((
    <Page tasks={tasks} />
  ));

  // 나머지는 다른 테스트에서 확인하니까 이것만 확인하면 되는걸까..?
  expect(container).toHaveTextContent('To-do');
});
