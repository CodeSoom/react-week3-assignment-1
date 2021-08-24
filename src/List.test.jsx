import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('tasks length가 0일 때는 "할 일이 없어요!"가 보여야한다.', () => {
    const tasks = [];

    const handleClickDelete = jest.fn();

    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');

    const countOfItems = container.getElementsByTagName('li').length;
    expect(countOfItems).toBe(tasks.length);
  });

  it('tasks length가 1 이상일 때는 Item들이 보여야한다.', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기1',
    },
    {
      id: 2,
      title: '뭐라도 하기2',
    }];

    const handleClickDelete = jest.fn();

    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(container).not.toHaveTextContent('할 일이 없어요!');

    const countOfItems = container.getElementsByTagName('li').length;
    expect(countOfItems).toBe(tasks.length);
  });
});
