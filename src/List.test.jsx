import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  context('할 일이 없는 경우', () => {
    it('"할 일 없어요!"를 표시한다.', () => {
      const { container } = render((
        <List tasks={[]} onClickDelete={onClickDelete} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있는 경우', () => {
    it('할 일의 title과 완료 버튼을 리스트로 보여준다.', () => {
      const tasks = [
        { id: 1, title: '새로운 할일 #1' },
        { id: 2, title: '새로운 할일 #2' },
        { id: 3, title: '새로운 할일 #3' },
      ];

      const { container, getAllByRole, getAllByText } = render((
        <List tasks={tasks} onClickDelete={onClickDelete} />
      ));

      expect(container).toHaveTextContent('완료');
      expect(getAllByText(/새로운 할일 #\d+$/)).toHaveLength(tasks.length);
      expect(getAllByRole('listitem')).toHaveLength(tasks.length);
    });
  });
});
