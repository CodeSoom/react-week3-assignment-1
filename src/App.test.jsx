import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <App />
  ));

  it('renders new todo item', () => {
    renderApp();

    const input = screen.getByPlaceholderText(/할 일을 입력/);
    const addButton = screen.getByText('추가');

    userEvent.type(input, 'something');
    userEvent.click(addButton);

    expect(screen.getByText('something')).toBeInTheDocument();
  });

  it('deletes selected todo item', () => {
    renderApp();

    const addButton = screen.getByText(/추가/);

    userEvent.click(addButton);

    const deleteButton = screen.getByText(/완료/);

    userEvent.click(deleteButton);

    expect(screen.getByText(/할 일이 없어요/)).toBeInTheDocument();
  });
});
