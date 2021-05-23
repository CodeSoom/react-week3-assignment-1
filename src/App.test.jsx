import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container, getByText } = render((
    <App />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
  expect(getByText(/추가/)).not.toBeNull();
});
