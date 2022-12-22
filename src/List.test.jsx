import { render, fireEvent } from '@testing-library/react';

import List from './List';
import items from './__fixtures__/items';

describe('List', () => {
  const handleClick = jest.fn();

  const renderList = (tasks = []) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  context('without task', () => {
    it('renders "할 일이 없어요!"', () => {
      const { container } = renderList();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const { container } = renderList(items);

      items.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('listens click delete event', () => {
      const { getAllByText } = renderList(items);

      getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClick).toBeCalledTimes(items.length);
    });
  });
});
