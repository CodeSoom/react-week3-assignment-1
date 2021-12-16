import { render } from '@testing-library/react';

import List from './List';

const handleClick = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});

// todo가 있을 때 해당 갯수만큼 item이 생겨야한다!
test('List has tasks', () => {
  const tasks = [
    { id: 1, task: '코드숨 과제하기!' },
    { id: 2, task: '테스트 주도 개발 공부하기!' },
  ];
  const { getAllByRole } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(getAllByRole('listitem')).toHaveLength(2);
});

// 길이가 0인 것도 테스트하려면 별도 배열을 생성해야 ?
// => test를 분리해서 테스트해준다!
// todo가 없을 때
test('List didnt have task', () => {
  const tasks = [];
  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
