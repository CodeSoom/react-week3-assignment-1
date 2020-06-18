import React from 'react';
import { render } from '@testing-library/react';

import Page from './Page';

test('Not Input Page', () => {
  const taskTitle = '';
  const tasks = [];

  const { container } = render(
    <Page
      value={taskTitle}
      tasks={tasks}
    />,
  );

  // 기본 화면이 잘 출력되는지 확인
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('Input Page', () => {
  const taskTitle = '밥 먹고 3주차 강의 보기!';
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

  const { container } = render(
    <Page
      value={taskTitle}
      tasks={tasks}
    />,
  );

  // 받아온 값을 잘 넘기고 있는지 확인
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('통과하지 못하는 테스트 작성(RED)');
  expect(container).toHaveTextContent('완료');
  expect(container).toHaveTextContent('테스트를 통과하는 코드 작성(GREEN)');
  expect(container).toHaveTextContent('완료');
  expect(container).toHaveTextContent('결과 코드를 깔끔하게 리팩터링(REFACTORING)');
  expect(container).toHaveTextContent('완료');
});
