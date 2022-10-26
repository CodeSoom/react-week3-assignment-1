import { render } from '@testing-library/react';

import App from './App';

test('todo app', () => {
  const { container } = render((<App />));
  expect(container).toHaveTextContent('할 일이 없어요!');
});
