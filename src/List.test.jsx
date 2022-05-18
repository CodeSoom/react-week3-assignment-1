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

  const handleClick = jest.fn();

  const renderList = ({ tasks }) => render(<List tasks={tasks} onClickDelete={handleClick} />);

  context('할 일이 있을 때', () => {
    it('List에 taskTitle, 완료 버튼을 출력한다.', () => {
      const { container } = renderList({ tasks: existTasks });

      expect(container).toHaveTextContent('1');
      expect(container).toHaveTextContent('완료');

      expect(container).toHaveTextContent('2');
      expect(container).toHaveTextContent('완료');

      expect(container).toHaveTextContent('3');
      expect(container).toHaveTextContent('완료');
    });

    it('mockClick 함수를 호출한 taskTitle에 알맞게 호출한다.', () => {
      const { getAllByText } = renderList({ tasks: existTasks });

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getAllByText('완료')[0]);
      expect(handleClick).toBeCalledWith(1);

      fireEvent.click(getAllByText('완료')[1]);
      expect(handleClick).toBeCalledWith(2);

      fireEvent.click(getAllByText('완료')[2]);
      expect(handleClick).toBeCalledWith(3);
    });
  });

  context('할 일이 없을 때,', () => {
    it("'할 일이 없어요!'를 출력한다", () => {
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
