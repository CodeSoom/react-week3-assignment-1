import { render } from '@testing-library/react';

import List from './List';

describe('List component', () => {
  const noTasks = [];
  const tasks = [{
    id: 1,
    title: '할 일 추가했음',
  }];
  const handleClick = jest.fn();

  context('without tasks', () => {
    it('returns text : "할 일이 없다"', () => {
      const { getByText } = render(
        <List tasks={noTasks} />,
      );

      getByText('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('returns tasks list', () => {
      const { getByText } = render(
        <List
          tasks={tasks}
        />,
      );

      getByText(tasks[0].title);

      expect(tasks[0]).toMatchObject({
        id: 1,
        title: '할 일 추가했음',
      });
    });
  });

  it('List component calls onClickDelete', () => {
    render(
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />,
    );

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
