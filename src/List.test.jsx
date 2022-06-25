import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderList = (tasks) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  context('내용이 없을 때', () => {
    it('tasks의 title이 없다고 렌더링된다', () => {
      const tasks = [];
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('내용이 있을 때', () => {
    const tasks = [
      {
        id: 1,
        title: '테스트 코드는 아주 어렵네요!',
      },
    ];

    it('tasks의 title을 렌더링한다', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('테스트 코드는 아주 어렵네요!');
    });

    it('click 이벤트를 listen 한다', () => {
      const { getByText } = renderList(tasks);

      fireEvent.click(getByText('완료'));

      expect(handleClick).toBeCalled();

      expect(handleClick).toBeCalledWith(1);
    });
  });
});
