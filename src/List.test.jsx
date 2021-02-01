import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '코딩하기',
    },
  ];

  const onClickDelete = jest.fn();

  // 질문
  // List 컴포넌트에서는 onClickDelete를 사용하지 않고 전달하기만 하는데도 테스트에 넣어줘야하나요???

  const { container } = render(<List
    tasks={tasks}
    onClickDelete={onClickDelete}
  />);

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('코딩하기');
});
