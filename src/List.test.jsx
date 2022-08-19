import { render } from '@testing-library/react';

import List from './List';

describe('List component', () => {
  const handleClickDelete = jest.fn();
  const setup = (tasks = []) => render(<List tasks={tasks} onClickDelete={handleClickDelete} />);

  context('When tasks is empty', () => {
    it('List render', () => {
      const { getByText } = setup();

      expect(getByText('할 일이 없어요!')).toBeTruthy();
    });
  });

  context('When tasks exist', () => {
    const tasks = [
      {
        id: 1,
        title: '뭐라도 하기',
      },
      {
        id: 2,
        title: '코드숨 화이팅!',
      },
      {
        id: 3,
        title: '리뷰 감사합니다!',
      },
    ];

    it('List render', () => {
      const { container } = setup(tasks);

      for (let i = 0; i < tasks.length; i += 1) {
        expect(container).toHaveTextContent(tasks[i].title);
      }
    });
  });
});
