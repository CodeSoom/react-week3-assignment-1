import { render, screen } from '@testing-library/react';

import Page from './Page';

const renderPageWithNoTasks = () => {
  const tasks = [];

  render(<Page tasks={tasks} />);
};

describe('Page 컴포넌트', () => {
  it('화면에 노출된다.', () => {
    renderPageWithNoTasks();

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent(/To-do/i);
  });

  it('Input 컴포넌트를 렌더한다.', () => {
    renderPageWithNoTasks();

    expect(screen.getByLabelText('할 일')).toBeInTheDocument();
  });

  context('할 일 목록이 없을 때', () => {
    it('할 일이 없어요!를 가진 List 컴포넌트를 렌더한다.', () => {
      renderPageWithNoTasks();

      expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('할 일 목록이 있을 때', () => {
    const tasks = [
      { id: 0, title: '첫 번째' },
      { id: 1, title: '두 번째' },
    ];

    it('할 일 목록을 가진 List 컴포넌트를 렌더한다.', () => {
      render(<Page tasks={tasks} />);

      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });
});
