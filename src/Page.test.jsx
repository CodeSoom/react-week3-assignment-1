import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [];

  const { container } = render((
    <Page tasks={tasks} />
  ));

  expect(container).toHaveTextContent('To-do');
});
