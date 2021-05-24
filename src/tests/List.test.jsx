import { render } from '@testing-library/react';

import List from '../components/List';

describe('List', () => {
  const renderList = () => (
    render((
      <List
        tasks={given.tasks}
        onClickDelete={jest.fn()}
      />
    ))
  );

  context('without tasks', () => {
    it('renders message', () => {
      given('tasks', () => []);
      const { getByText } = renderList();

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('with tasks', () => {
    given('tasks', () => [{ id: 1 }, { id: 2 }, { id: 3 }]);

    it('renders tasks', () => {
      const { getAllByRole } = renderList();

      expect(getAllByRole('listitem')).toHaveLength(given.tasks.length);
    });

    it('renders finish button for each task', () => {
      const { getAllByRole } = renderList();

      expect(getAllByRole('button')).toHaveLength(given.tasks.length);
    });
  });
});
