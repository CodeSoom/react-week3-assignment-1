import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const listElement = (task) => (
    <List
      tasks={task}
      onClick={handleClickDelete}
    />
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('List에서 할 일이 없을 때', () => {
    it('할 일이 없어요 문구 랜더링된다', () => {
      const task = [];
      const { getByText } = render(listElement(task));
      getByText('할 일이 없어요!');
    });
  });

  context('List에서 할 일이 있을 때', () => {
    it('입력한 할 일이 랜더링된다', () => {
      const tasks = [{
        id: 1,
        title: '잠자기',
      },
      {
        id: 2,
        title: '누워있기',
      },
      ];

      const { container } = render(
        listElement(tasks),
      );

      expect(container).toHaveTextContent('잠자기');
      expect(container).toHaveTextContent('누워있기');
    });
  });
});
