import { render } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  const onClickDelete = jest.fn();

  const renderElement = (task) => (
    <List
      tasks={task}
      onClick={onClickDelete}
    />
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('List에서 할일 이 없을 때', () => {
    it('할 일이 없어요가 뜨는가', () => {
      const task = [];
      const { getByText } = render(renderElement(task));
      getByText('할 일이 없어요!');
    });
  });

  context('List에서 할 일이 있을 때', () => {
    it('task들의 목록이 잘 뜨는가', () => {
      const tasks = [{
        id: 1,
        title: '코드숨 과제',
      },
      {
        id: 2,
        title: '코드숨 과제하는중',
      },
      ];

      const { container } = render(
        renderElement(tasks),
      );

      expect(container).toHaveTextContent('코드숨 과제');
      expect(container).toHaveTextContent('코드숨 과제하는중');
    });
  });
});
