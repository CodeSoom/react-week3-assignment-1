import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
// 리스트가 제대로 왔는지 확인?
  const tasks = [
    {
      id: 2,
      title: '뭐라도 해보기.',
    },
  ];

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 해보기.완료');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(2);
});

test('List', () => {
  // 리스트가 제대로 왔는지 확인?
  const tasks = [
  ];

  const handleClick = jest.fn();

  const { container } = render(
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />,
  );

  expect(container).toHaveTextContent('할 일이 없어요!');
});
