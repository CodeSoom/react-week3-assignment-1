import { screen, render } from '@testing-library/react';

import App from './App';

describe('App Test', () => {
  test('App를 렌더한다.', () => {
    render(
      <App />,
    );

    expect(screen.getByText('To-do')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('추가')).toBeInTheDocument();
  });
});
