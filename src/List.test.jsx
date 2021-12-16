import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();
  context('tasks가 0개일 때', () => {
    it('할 일이 없어요!" 문구가 노출되어야한다.', () => {
      const tasks = [];

      const { container } = render(
        <List tasks={tasks} onClickDelete={onClickDelete} />,
      );

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks가 1개이상일 떄', () => {
    it('해당 목록이 보여야한다.', () => {
      const tasks = [
        { id: 1, title: '기상' },
        { id: 2, title: '출근' },
      ];

      const { container } = render(
        <List tasks={tasks} onClickDelete={onClickDelete} />,
      );

      expect(container).toHaveTextContent('기상');
      expect(container).toHaveTextContent('출근');
    });
  });
});
