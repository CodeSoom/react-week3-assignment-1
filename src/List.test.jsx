import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const existTasks = [
    {
      id: 1,
      title: '1',
    },
    {
      id: 2,
      title: '2',
    },
    {
      id: 3,
      title: '3',
    },
  ];

  const mockClick = jest.fn();

  function renderList({ tasks }) {
    return render(<List tasks={tasks} onClickDelete={mockClick} />);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('1. 할 일이 있을 때', () => {
    it('1.1. List에 taskTitle, 완료 버튼이 출력되어야 한다.', () => {
      const { container } = renderList({ tasks: existTasks });

      expect(container).toHaveTextContent('1');
      expect(container).toHaveTextContent('완료');

      expect(container).toHaveTextContent('2');
      expect(container).toHaveTextContent('완료');

      expect(container).toHaveTextContent('3');
      expect(container).toHaveTextContent('완료');
    });

    context('1.2. 완료 버튼을 클릭했을 때,', () => {
      it('1.2.1. mockClick 함수가 호출한 taskTitle에 알맞게 호출되어야 한다.', () => {
        const { getAllByText } = renderList({ tasks: existTasks });

        expect(mockClick).not.toBeCalled();

        fireEvent.click(getAllByText('완료')[0]);
        expect(mockClick).toBeCalledWith(1);

        fireEvent.click(getAllByText('완료')[1]);
        expect(mockClick).toBeCalledWith(2);

        fireEvent.click(getAllByText('완료')[2]);
        expect(mockClick).toBeCalledWith(3);
      });
    });
  });

  context('2. 할 일이 없을 때,', () => {
    it("2.1. '할 일이 없어요!'가 출력되어야 한다", () => {
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
