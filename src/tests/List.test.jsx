import { render, screen } from '@testing-library/react';

import List from '../components/List';

const renderEmptyList = () => {
  render(
    <List
      tasks={[]}
      onClickDelete={() => null}
    />,
  );
};

const renderNonEmptyList = () => {
  render(
    <List
      tasks={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      onClickDelete={() => null}
    />,
  );
};

describe('Test List component', () => {
  context('when list is empty', () => {
    renderEmptyList();
    it('text renders', () => {
      expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('when list is not empty', () => {
    it('items render', () => {
      renderNonEmptyList();
      expect(screen.getAllByRole('listitem').length).toBe(3);
    });

    it('buttons render', () => {
      renderNonEmptyList();
      expect(screen.getAllByRole('button').length).toBe(3);
    });
  });
});
