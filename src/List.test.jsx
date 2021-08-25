import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('task 가 없을 때', () => {
    it('"할 일이 없어요" 메시지를 보여준다', () => {
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
  });

  context('task 가 있을 떄', () => {
    it('task 수 만큼 아이템이 보여야 한다.', () => {
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
});
