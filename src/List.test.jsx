import { render } from '@testing-library/react';
import List from './List';

test('할 일이 없을 때', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('할 일이 있을 때', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  },
  {
    id: 2,
    title: '아무 것도 하지 않기',
  }];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('아무 것도 하지 않기');
});
