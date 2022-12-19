import { render, screen } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  it('Page는 To-do를 가지는 헤딩을 화면에 노출시켜야 한다.', () => {
    const tasks = [];
    render(<Page tasks={tasks} />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent(/To-do/i);
  });
});
