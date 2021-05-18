import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('empty App', () => {
    const { container } = render((
      <App />
    ));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
