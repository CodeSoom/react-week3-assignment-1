import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [];
  const defaultText = '할 일이 없어요!';
  const handleClickDelete = jest.fn();

  const renderList = (todos) => render((
    <List
      tasks={todos}
      onClickDelete={handleClickDelete}
    />
  ));

  context('task가 없을 때', () => {
    it('task가 없으면 Default 텍스트가 존재한다.', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent(defaultText);
    });
  });

  context('task가 있을 때', () => {
    it('task가 있으면 Default 텍스트가 존재하지 않는다.', () => {
      tasks.push({ id: 1, title: '코드숨 공부하기' });

      const { container } = renderList(tasks);

      expect(container).not.toHaveTextContent(defaultText);
    });
  });
});
