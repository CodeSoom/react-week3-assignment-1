import { render } from '@testing-library/react';

import List from './List';

import tasks from '../fixtures/tasks';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const listElement = (task) => render((
    <List
      tasks={task}
      onClick={handleClickDelete}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('List에서 할 일이 없을 때', () => {
    it('할 일이 없어요 문구 랜더링된다', () => {
      const task = [];
      const { getByText, container } = listElement(task);

      getByText('할 일이 없어요!');

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('List에서 할 일이 있을 때', () => {
    it('입력한 할 일이 랜더링된다', () => {
      const { container } = listElement(tasks);

      expect(container).toHaveTextContent('잠자기');
      expect(container).toHaveTextContent('누워있기');
    });
  });
});
