import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const { container } = render((<Page/>));

  expect(container).toHaveTextContent('To-do');
});
