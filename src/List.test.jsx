import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderList = (tasks) => (
    render(
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />,
    )
  );

  context('without tassk', () => {
    it('without tasks', () => {
      const tasks = [];
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('render tasks', () => {
      const tasks = [
        {
          id: 1,
          title: '아무거나 하기',
        },
        {
          id: 2,
          title: '코드숨 강의 시청',
        },
      ];
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('아무거나 하기');
      expect(container).toHaveTextContent('코드숨 강의 시청');
    });
  });
});
