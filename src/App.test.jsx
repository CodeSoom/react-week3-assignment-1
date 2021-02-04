import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('renders labels and change event', () => {
    const { container, getByLabelText } = renderApp();

    expect(container).toHaveTextContent('할 일');

    const label = getByLabelText('할 일');

    fireEvent.change(label, { target: { value: '아무 것도 안하기' } });

    expect(label.value).toBe('아무 것도 안하기');
  });
});
