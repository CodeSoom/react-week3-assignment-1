import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const emptyText = '할 일이 없어요!';
  const handleClickDelete = jest.fn();

  const renderList = (tasks) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  context('task가 없을 때', () => {
    it('"할 일이 없어요!" 텍스트가 존재한다.', () => {
      const { container } = renderList([]);

      expect(container).toHaveTextContent(emptyText);
    });
  });

  context('task가 있을 때', () => {
    it('"할 일이 없어요!" 텍스트가 존재하지 않는다.', () => {
      const tasks = [{ id: 1, title: '코드숨 공부하기' }];
      const { container } = renderList(tasks);

      expect(container).not.toHaveTextContent(emptyText);
    });
  });
});
