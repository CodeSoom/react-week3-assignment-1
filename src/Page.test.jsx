import { render } from '@testing-library/react';

import Page from './Page';

test('input, list 태그 존재 여부확인하기', () => {
  const tasks = [];

  const { container } = render((
    <Page
      tasks={tasks}
    />
  ));

  expect(container.hasChildNodes('input')).toBe(true);
  expect(container.hasChildNodes('list')).toBe(true);
});
