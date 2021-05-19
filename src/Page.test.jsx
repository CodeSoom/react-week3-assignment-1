import { render, screen } from '@testing-library/react';
import Page from './Page';

describe('<Page />', () => {
  const tasks = [];
  it('renders title, Input, List', () => {
    render(<Page tasks={tasks} />);

    screen.getByRole('heading', { name: /To-do/i });

    screen.getByRole('textbox', { name: /할 일/ });
    screen.getByRole('button', { name: /추가/ });

    screen.getByText(/할 일이 없어요!/);
  });

  it('renders text when tasks does not exist ', () => {});

  it('creates new task', () => {});

  it('removes task', () => {});
});
