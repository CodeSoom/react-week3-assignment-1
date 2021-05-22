import { render } from '@testing-library/react';
import List from './List';

test('List 컴포넌트 구성요소는 ol, Item로 구성되어 있다.', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  }];
  const { container } = render(<List tasks={tasks} />);

  expect(container).toContainHTML('ol');
  expect(container).toContainHTML('li');

  expect(container.firstChild).toMatchSnapshot();
});

test('목록에 할일이 없음을 알 수 있다.', () => {
  const tasks = [];
  const { container } = render(<List tasks={tasks} />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('할일 목록을 확인할 수 있다.', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  },
  {
    id: 2,
    title: '뭐라도 했니',
  },
  {
    id: 3,
    title: '뭐라도 안하니',
  }];

  const { container } = render(<List tasks={tasks} />);

  expect(container).not.toHaveTextContent('할 일이 없어요!');
  tasks.forEach((task) => {
    expect(container).toHaveTextContent(task.title);
  });
  expect(container.firstChild).toMatchSnapshot();
});
