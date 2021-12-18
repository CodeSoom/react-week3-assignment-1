import { fireEvent, render } from '@testing-library/react';

import List from './List';

const handleClick = jest.fn();
const emptyTasks = [];
const tasks = [
  { id: 100, title: '숨 쉬기' },
  { id: 101, title: '물 마시기' },
];

const ListComponentWithoutTasks = () => render(
  <List
    tasks={emptyTasks}
    onClickDelete={handleClick}
  />,
);

const ListComponentWithTasks = () => render(
  <List
    tasks={tasks}
    onClickDelete={handleClick}
  />,
);

describe('List', () => {
  context('task가 없을 때', () => {
    it('\'할 일이 없어요!\' 출력', () => {
      const { container } = ListComponentWithoutTasks();
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('task가 두개 일때', () => {
    it('Item컴포넌트가 가진 title과 완료버튼을 그린다.', () => {
      const { container, getAllByText } = ListComponentWithTasks();

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);

      expect(getAllByText('완료')[0]).toContainHTML('button');
      expect(getAllByText('완료')[1]).toContainHTML('button');
    });

    it('버튼이 작동한다.', () => {
      const { getAllByText } = ListComponentWithTasks();

      fireEvent.click(getAllByText('완료')[0]);
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.click(getAllByText('완료')[1]);
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });
});
