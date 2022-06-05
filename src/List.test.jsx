import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  describe('할일이 있을 때', () => {
    const tasks = [
      {
        id: 1,
        title: '뭐라도 하기',
      },
      {
        id: 2,
        title: '코드숨 과제',
      },
    ];

    it('주어진 tasks의 타이틀과 완료 버튼이 나오는 지', () => {
      const { container } = render(<List tasks={tasks} onClickDelete={handleClick} />);

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
        expect(container).toHaveTextContent('완료');
      });
    });

    it('선택한 태스크의 완료 버튼이 클릭이 되는 지', () => {
      const { getAllByText } = render(<List tasks={tasks} onClickDelete={handleClick} />);

      expect(handleClick).not.toBeCalled();

      tasks.forEach((_, index) => {
        fireEvent.click(getAllByText('완료')[index]);
      });

      expect(handleClick).toBeCalledWith(tasks.length);
    });
  });

  describe('할일이 없을 때', () => {
    const tasks = [];

    it('할 일이 없어요! 가 나오는 지', () => {
      const { container } = render(<List tasks={tasks} onClickDelete={handleClick} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
