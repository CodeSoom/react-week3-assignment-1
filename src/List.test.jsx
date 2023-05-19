import { render } from '@testing-library/react';
import List from './List';

// List 테스트 항목
// tasks를 받아서 보여준다.
// tasks가 없거나 잘못들어올 경우
// tasks가 있는 경우

const handleClickDelete = jest.fn();
function renderList(tasks = []) {
  return render(<List tasks={tasks} onClickDelete={handleClickDelete} />);
}

describe('List 컴포넌트가 렌더링이 된다.', () => {
  context('tasks가 없는 경우', () => {
    it('할 일이 없어요가 보인다.', () => {
      const { container } = renderList();
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
  context('tasks가 있는 경우', () => {
    it('tasks의 길이만큼 Item 컴포넌트가 렌더링된다.', () => {
      const tasks = [
        { id: 1, taskTitle: '하기 싫어요' },
        { id: 2, taskTitle: '너무 좋아요' },
      ];
      const { getAllByRole } = renderList(tasks);
      expect(getAllByRole('listitem')).toHaveLength(tasks.length);
    });
  });
});
