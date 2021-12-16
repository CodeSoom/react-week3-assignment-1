import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => (
    render(
      <App />,
    )
  );

  context('without tasks', () => {
    it('renders "할 일이 없어요!"', () => {
      const title = '';
      const tasks = [];
      const { container } = renderApp(title, tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
