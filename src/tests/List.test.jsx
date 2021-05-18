import { render, screen } from '@testing-library/react';

import List from '../components/List';

describe('Test List component', () => {
  context('when list is empty', () => {
    render(
      <List
        tasks={[]}
        onClickDelete={() => null}
      />,
    );

    it('text renders', () => {
      expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('when list is not empty', () => {
    const element = (
      <List
        tasks={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        onClickDelete={() => null}
      />
    );

    it('items render', () => {
      render(element);
      expect(screen.getAllByRole('listitem').length).toBe(3);
    });

    it('buttons render', () => {
      render(element);
      expect(screen.getAllByRole('button').length).toBe(3);
    });
  });
});
