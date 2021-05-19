import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('App component', () => {
  given('container', () => (
    render(<App />)
  ));

  it('adds current input to list', () => {
    const { getByText, queryByText, getByRole } = given.container;

    expect(queryByText('건물 매입')).not.toBeInTheDocument();

    userEvent.type(
      getByRole('textbox', { name: '할 일' }),
      '건물 매입',
    );
    userEvent.click(getByRole('button', { name: '추가' }));

    expect(getByText('건물 매입')).toBeInTheDocument();
  });

  it('only removes target task from list', () => {
    const { getByText, queryByText, getByRole } = given.container;

    userEvent.type(
      getByRole('textbox', { name: '할 일' }),
      '건물1 매입',
    );
    userEvent.click(getByRole('button', { name: '추가' }));

    userEvent.type(
      getByRole('textbox', { name: '할 일' }),
      '건물2 매입',
    );
    userEvent.click(getByRole('button', { name: '추가' }));

    expect(getByText('건물1 매입')).toBeInTheDocument();
    expect(getByText('건물2 매입')).toBeInTheDocument();

    userEvent.click(
      within(getByText('건물1 매입'))
        .getByRole('button', { name: '완료' }),
    );
    expect(queryByText('건물1 매입')).not.toBeInTheDocument();
    expect(getByText('건물2 매입')).toBeInTheDocument();

    userEvent.click(
      within(getByText('건물2 매입'))
        .getByRole('button', { name: '완료' }),
    );
    expect(queryByText('건물1 매입')).not.toBeInTheDocument();
    expect(queryByText('건물2 매입')).not.toBeInTheDocument();
    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
