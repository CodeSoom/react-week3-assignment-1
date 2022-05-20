import { render } from '@testing-library/react';
import { exampleTasks } from './example';
import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();
  const renderList = (tasks) => render(<List tasks={tasks} onClickDelete={handleClickDelete} />);

  context('리스트 길이가 0이면', () => {
    it('할 일이 없어요! 가 출력된다.', () => {
      const { container } = renderList([]);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks의 길이만큼', () => {
    it('Item 항목이 출력된다', () => {
      const { getAllByText } = renderList(exampleTasks);
      expect(getAllByText('완료')).toHaveLength(2);
    });
  });
});
