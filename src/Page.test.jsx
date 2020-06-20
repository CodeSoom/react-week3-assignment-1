import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  it('Page has no tasks', () => {
    const tasks = [];

    const onChange = jest.fn();
    const handleClick = jest.fn();
    const handleClickDelete = jest.fn();

    const { container } = render((
      <Page
        tasks={tasks}
        onChange={onChange}
        onClick={handleClick}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(onChange).not.toBeCalled();
    expect(handleClick).not.toBeCalled();
    expect(handleClickDelete).not.toBeCalled();

    // [v] TODO: '할 일이 없어요!' 출력이 되는지 테스트
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('Page has tasks', () => {
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

    const onChange = jest.fn();
    const handleClick = jest.fn();
    const handleClickDelete = jest.fn();

    const { container } = render((
      <Page
        tasks={tasks}
        onChange={onChange}
        onClick={handleClick}
        onClickDelete={handleClickDelete}
      />
    ));


    expect(onChange).not.toBeCalled();
    expect(handleClick).not.toBeCalled();
    expect(handleClickDelete).not.toBeCalled();
    // [ ] TODO: key

    // [ ] TODO: task
    expect(container).toHaveTextContent('뭐라도 하기 1');
    expect(container).toHaveTextContent('뭐라도 하기 2');
  });
});
