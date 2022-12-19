import { render, screen } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('할 일 목록이 없을 때 "할 일이 없어요!"를 화면에 노출시켜야 한다.', () => {
    const tasks = [];
    render(<List tasks={tasks} />);

    const list = screen.getByRole('paragraph');

    expect(list).toHaveTextContent('할 일이 없어요!');
  });

  it('할 일 목록이 있을 때, 화면에 노출시켜야 한다.', () => {
    const tasks = [{
      id: 0,
      title: '안녕하세요',
    }];
    render(<List tasks={tasks} />);

    const list = screen.getByRole('listitem');

    expect(list).toHaveTextContent(/안녕하세요/i);
  });
});
