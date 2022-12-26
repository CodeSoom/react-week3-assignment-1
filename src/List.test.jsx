import { render, screen } from '@testing-library/react';

import List from './List';

describe('List 컴포넌트', () => {
  context('할 일 목록이 없을 때', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 화면에 노출시켜야 한다.', () => {
      render(<List tasks={tasks} />);

      expect(screen.getByText(/할 일이 없어요!/)).toBeInTheDocument();
    });
  });

  context('할 일 목록이 있을 때', () => {
    const tasks = [
      { id: 0, title: '첫 번째' },
      { id: 1, title: '두 번째' },
    ];

    it('할일 목록 리스트는 화면에 렌더된다.', () => {
      render(<List tasks={tasks} />);

      const list = screen.getByRole('list');

      expect(list).toHaveTextContent(/첫 번째/i);
    });
  });
});
