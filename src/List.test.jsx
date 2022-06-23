import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  // events
  const handleClickDelete = jest.fn();

  // elements
  const renderElement = (tasks) => render(
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />,
  );

  beforeEach(() => jest.clearAllMocks());

  context('1. tasks가 없는 경우.', () => {
    // props
    const noHavaTasks = [];

    it('(할 일이 없어요!) 문구를 렌더링 한다.', () => {
      const { container } = renderElement(noHavaTasks);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('2. tasks가 있는 경우.', () => {
    // props
    const haveTasks = [
      { id: 0, title: '첫 번째 할일' },
      { id: 1, title: '두 번째 할일' },
    ];

    it('(첫 번째 할일), (두 번째 할일)을 렌더링 한다.', () => {
      const { container } = renderElement(haveTasks);
      expect(container).toHaveTextContent('첫 번째 할일');
      expect(container).toHaveTextContent('두 번째 할일');
    });

    it('완료 버튼을 누르면, 해당하는 task의 handleClickDelete가 실행된다.', () => {
      const { getAllByText } = renderElement(haveTasks);
      expect(handleClickDelete).not.toBeCalled();
      fireEvent.click(getAllByText('완료')[0]);
      expect(handleClickDelete).toBeCalled();

      fireEvent.click(getAllByText('완료')[1]);
      expect(handleClickDelete).toBeCalledTimes(2);
    });
  });
});
