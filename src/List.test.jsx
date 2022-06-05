import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [
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
    it('List에 할 일, 완료 버튼을 출력한다.', () => {
      const { container } = renderList({ tasks });

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
        expect(container).toHaveTextContent('완료');
      });
    });

    it('mockClick 함수를 호출한 taskTitle에 알맞게 호출한다.', () => {
      const { getAllByText } = renderList({ tasks });

      tasks.forEach(({ id }, index) => {
        fireEvent.click(getAllByText('완료')[index]);
        expect(handleClick).toBeCalledWith(id);
      });
    });
  });

  context('할 일이 없을 때,', () => {
    it("'할 일이 없어요!'를 출력한다", () => {
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
