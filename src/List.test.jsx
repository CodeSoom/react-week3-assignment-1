import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  const renderList = (tasks = []) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  context('without tasks', () => {
    it('renders "할 일이 없어요!"', () => {
      const { container } = renderList();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [
      {
        id: 1,
        title: 'study',
      },
      {
        id: 2,
        title: 'play',
      },
    ];

    it('renders tasks', () => {
      const { container } = renderList(tasks);

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('handles click', () => {
      const { getAllByText } = renderList(tasks);

      getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClick).toBeCalledTimes(tasks.length);
    });
  });
});
