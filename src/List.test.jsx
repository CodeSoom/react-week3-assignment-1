import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

test('Not Exist List', () => {
  const tasks = [];

  // 목록을 받아서 화면에 보여줘야 함
  const { container } = render(
    <List
      tasks={tasks}
    />,
  );

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('Exist List', () => {
  const tasks = [
    {
      id: 100,
      title: '통과하지 못하는 테스트 작성(RED)',
    },
    {
      id: 101,
      title: '테스트를 통과하는 코드 작성(GREEN)',
    },
    {
      id: 102,
      title: '결과 코드를 깔끔하게 리팩터링(REFACTORING)',
    },
  ];

  // 목록을 받아서 화면에 보여줘야 함
  const { container } = render(
    <List
      tasks={tasks}
    />,
  );

  expect(container).toHaveTextContent('통과하지 못하는 테스트 작성(RED)');
  expect(container).toHaveTextContent('완료');
  expect(container).toHaveTextContent('테스트를 통과하는 코드 작성(GREEN)');
  expect(container).toHaveTextContent('완료');
  expect(container).toHaveTextContent('결과 코드를 깔끔하게 리팩터링(REFACTORING)');
  expect(container).toHaveTextContent('완료');
});
