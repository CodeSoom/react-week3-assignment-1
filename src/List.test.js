import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const ListRender = (value) => render((
    <List
      tasks={value}
      onClickDelete={handleClickDelete}
    />
  ));

  // tasks의 길이가 0일 때 즉 할 일이 하나도 없을 때
  it('Empty', () => {
    const tasks = [];

    const { getByText } = ListRender(tasks);

    // 빈 tasks 를 ListRender에 넘겨줬을 때
    // 기대되는 행동은 할 일이 없어요를 보여줘야 한다.
    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });

  // tasks가 입력되어 비어있지 않을 때
  it('NotEmpty', () => {
    const tasks = [
      {
        id: 100,
        title: '할 일 1',
      },
      {
        id: 101,
        title: '할 일 2',
      },
    ];

    const { getByText } = ListRender(tasks);

    // 비어있지 않은 tasks를 ListRender에 넘겨줬을 때
    // 기대되는 행동은 할 일들을 보여줘한다.
    // 흠 왜 map은 안되는 걸까?
    tasks.forEach((task) => {
      expect(getByText(task.title)).toBeInTheDocument();
    });
  });
});
