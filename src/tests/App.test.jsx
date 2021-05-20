import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('App component', () => {
  it('adds current input to list', () => {
    const { getByText, queryByText, getByRole } = render(<App />);

    expect(queryByText('건물 매입')).not.toBeInTheDocument();

    userEvent.type(
      getByRole('textbox', { name: '할 일' }),
      '건물 매입',
    );
    userEvent.click(getByRole('button', { name: '추가' }));

    expect(getByText('건물 매입')).toBeInTheDocument();
  });

  it('only removes target task from list', () => {
    const { getByText, queryByText, getByRole } = render(<App />);

    userEvent.type(
      getByRole('textbox', { name: '할 일' }),
      '건물 매입',
    );
    userEvent.click(getByRole('button', { name: '추가' }));

    expect(getByText('건물 매입')).toBeInTheDocument();

    userEvent.click(
      within(getByText('건물 매입'))
        .getByRole('button', { name: '완료' }),
    );
    expect(queryByText('건물 매입')).not.toBeInTheDocument();
  });
});
