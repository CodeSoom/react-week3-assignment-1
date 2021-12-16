import { render } from '@testing-library/react';

import List from './List';
import Item from './Item';

it('when tasks arr gets obj -> show title of obj and so on..', () => {
  const tasks = [
    { id: 100, title: '운동가기' },
  ];

  const { container } = render(<List tasks={tasks} />);

  expect(container).toHaveTextContent('운동가기');
  expect(container).toHaveTextContent('완료');
});

it('when tasks arr is empty -> show specific content', () => {
  const tasks = [];

  const { container } = render(<List
    tasks={tasks}
  />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

it('when tasks arr has task obj -> pass value to sub component', () => {
  const task = { id: 100, title: '운동가기' };
  const handleClick = jest.fn();

  render(
    <Item
      key={task.id}
      task={task}
      onClickDelete={handleClick}
    />,
  );
});
