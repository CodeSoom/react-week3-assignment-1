import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

test('List is not empty', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  }];

  const onClickDelete = jest.fn();

  if (tasks.length >= 1) {
    const { container, getByText } = render((

      <ol>
        {tasks.map((task) => (
          <Item key={task.id} task={task} onClickDelete={onClickDelete} />
        ))}
      </ol>

    ));

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');

    expect(onClickDelete).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(onClickDelete).toBeCalledWith(1);
  } else {
    const { container } = render((
      <p>할 일이 없어요!</p>
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  }
});
