import { render, screen } from '@testing-library/react';

import List from './List';

test('List', () => {
  const { rerender } = render(<List tasks={[]} />);

  screen.getByText('할 일이 없어요!');

  rerender(<List tasks={[{ id: 100, title: '회고 작성하기' }]} />);

  screen.getByText('회고 작성하기');
});

// List의 기능
// - tasks 배열의 길이가 0일 경우 '할 일이 없어요!' 텍스트 렌더링
// - tasks 배열의 길이가 0이 아닐 경우 data의 title text를 갖고 있는다.
