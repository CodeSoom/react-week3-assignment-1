import { render } from '@testing-library/react';
import App from './App';

test('App', () => {
  const { container } = render((
    <App />
  ));

  expect(container).toBeDefined();
});
