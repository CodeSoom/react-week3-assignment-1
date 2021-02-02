import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('emptyList', () => {
  const { container } = render((
    <List tasks={[]} />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('filledList', () => {
  const { container } = render((
    <List tasks={[
      { id: 1, title: '안녕하세요' },
      { id: 2, title: '저는' },
      { id: 3, title: '이상훈이에요' },
    ]}
    />
  ));
  expect(container).toHaveTextContent('안녕하세요');
  expect(container).toHaveTextContent('저는');
  expect(container).toHaveTextContent('이상훈이에요');
  expect(container).toHaveTextContent('완료');
});
