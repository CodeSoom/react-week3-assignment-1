import { fireEvent, render } from '@testing-library/react';
import List from './List';

describe('List', () => {
  const tasks = [
    {
      id: 1,
      title: '배고파요',
    },
    {
      id: 2,
      title: '치킨을 먹어요',
    },
    {
      id: 3,
      title: '피자를 먹어요',
    },
  ];

  const handleClickDelete = jest.fn();
  function renderList(newTasks = tasks) {
    return render((
      <List
        tasks={newTasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('1. 할일 있을 때', () => {
    it('1-1. 할일 리스트 출력', () => {
      const { container } = renderList();

      expect(container).toHaveTextContent('배고파요');
      expect(container).toHaveTextContent('치킨을 먹어요');
      expect(container).toHaveTextContent('피자를 먹어요');
    });

    it("1-2. '완료' 버튼 출력", () => {
      const { container } = renderList();

      expect(container).toHaveTextContent('완료');
    });

    it("1-3. '완료' 버튼 클릭 (배고파요 삭제, 피자를 먹어요 삭제)", () => {
      const { container, getAllByText } = renderList();

      expect(container).toHaveTextContent('완료');

      fireEvent.click(getAllByText('완료')[0]);
      expect(handleClickDelete).toBeCalledWith(1);

      fireEvent.click(getAllByText('완료')[1]);
      expect(handleClickDelete).toBeCalledWith(2);

      fireEvent.click(getAllByText('완료')[2]);
      expect(handleClickDelete).toBeCalledWith(3);
    });
  });

  context('2. 빈 배열일 때', () => {
    it("2-1. '할 일이 없어요!' 출력", () => {
      const { container } = renderList([]);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
