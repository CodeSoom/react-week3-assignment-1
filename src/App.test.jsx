import { render, screen } from '@testing-library/react';

import App from './App';

describe('App 컴포넌트', () => {
  render(<App />);

  it('화면에 렌더 되다', () => {
    expect(screen.getByText(/To-do/i));
  });
});
