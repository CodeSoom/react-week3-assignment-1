import { render } from '@testing-library/react';

import List from './List';
import Item from './Item';

test('할 일이 입력되면 할 일 목록을 볼 수 있다', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  }];

  const handleClick = jest.fn();

  const { container } = render((
    <List tasks={tasks}>
      <Item
        task={tasks[0]}
        onClickDelete={handleClick}
      />
    </List>
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
});

test('할 일 목록이 없으면 할 일이 없어요', () => {
  const tasks = [];

  const handleClick = jest.fn();

  const { container } = render((
    <List tasks={tasks}>
      <Item
        task={tasks[0]}
        onClickDelete={handleClick}
      />
    </List>
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
