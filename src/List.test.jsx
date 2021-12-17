import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  context('when tasks is exists', () => {
    it('renders tasks', () => {
      const tasks = [
        { id: 1, task: '코드숨 과제하기!' },
        { id: 2, task: '테스트 주도 개발 공부하기!' },
      ];
      const { getAllByRole } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      expect(getAllByRole('listitem')).toHaveLength(tasks.length);
    });
  });

  context('when tasks is empty', () => {
    test('renders empty message', () => {
      const tasks = [];
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
