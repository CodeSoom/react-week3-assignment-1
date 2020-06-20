import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Lsit from './List';

describe('<List />', () => {
  test('할 일이 없을 때', () => {
    const tasks = [];
    const { container } = render((
      <Lsit
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  test('할 일이 있을 때', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];
    const { getByText } = render((
      <Lsit
        tasks={tasks}
      />
    ));

    expect(getByText(tasks[0].title)).toBeTruthy();
  });

  test('onClickDelete 호출', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];
    const onClickDelete = jest.fn();

    const { getByText } = render((
      <Lsit
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));

    fireEvent.click(getByText('완료'));

    expect(onClickDelete).toBeCalledWith(1);
  });
});
