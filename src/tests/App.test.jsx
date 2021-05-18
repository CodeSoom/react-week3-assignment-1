import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

const addTask = (title) => {
  userEvent.type(
    screen.getByRole('textbox', { name: '할 일' }),
    title,
  );
  userEvent.click(screen.getByRole('button', { name: '추가' }));
};

const deleteTask = (title) => {
  const targetTask = screen.getByText(title);
  userEvent.click(within(targetTask).getByRole('button', { name: '완료' }));
};

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  context('when user wants to add task', () => {
    it('adds current input to list', () => {
      expect(screen.queryByText('건물 매입')).not.toBeInTheDocument();

      addTask('건물 매입');

      expect(screen.getByText('건물 매입')).toBeInTheDocument();
    });
  });

  context('when user wants to delete task', () => {
    it('only removes target task from list', () => {
      addTask('건물1 매입');
      addTask('건물2 매입');

      expect(screen.getByText('건물1 매입')).toBeInTheDocument();
      expect(screen.getByText('건물2 매입')).toBeInTheDocument();

      deleteTask('건물1 매입');

      expect(screen.queryByText('건물1 매입')).not.toBeInTheDocument();
      expect(screen.getByText('건물2 매입')).toBeInTheDocument();
    });
  });
});
