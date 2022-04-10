import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('render app', () => {
    const { getByText, getAllByText } = renderApp();

    expect(getByText(/추가/)).not.toBeNull();
    expect(getAllByText(/할 일이 없어요/)).not.toBeNull();
  });
});
