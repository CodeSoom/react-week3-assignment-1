import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    { id: 1, task: '코드숨 과제하기!' },
    { id: 2, task: '테스트 주도 개발 공부하기!' },
  ];
  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toBe('아이템 컴포넌트 호출');
  // return이 또 다른 컴포넌트일 때
  // 길이가 0인 것도 테스트하려면 별도 배열을 생성해야 ?
});
