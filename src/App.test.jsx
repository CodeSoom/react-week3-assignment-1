import { render } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('제목이 보인다.', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
  });
});
