import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('List has no tasks', () => {
    const tasks = [];
    const handleClickDelete = jest.fn();

    const { container } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(handleClickDelete).not.toBeCalled();

    // [v] TODO: '할 일이 없어요!' 출력이 되는지 테스트
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('List has tasks', () => {
    const tasks = [
      {
        id: 1,
        title: '뭐라도 하기 1',
      },
      {
        id: 2,
        title: '뭐라도 하기 2',
      },
    ];
    const handleClickDelete = jest.fn();

    const { container, getByText } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(handleClickDelete).not.toBeCalled();


    // [ ] TODO: key

    // [ ] TODO: task
    expect(container).toHaveTextContent('뭐라도 하기 1');
    expect(container).toHaveTextContent('뭐라도 하기 2');

    fireEvent.click(getByText('뭐라도 하기 1'));
    expect(handleClickDelete).not.toBeCalledWith(1);
  });
});
