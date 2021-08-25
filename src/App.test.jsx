import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const tasks = [];

  const { container } = render((
    <App tasks={tasks} />
  ));

  expect(container).toHaveTextContent('To-do');
});
