import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <App />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders To-do, input, button, text', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
