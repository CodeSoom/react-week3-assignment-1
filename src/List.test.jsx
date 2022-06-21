import { fireEvent, render } from '@testing-library/react';

import List from './List';

test('할일이 없을때', () => {
  const taskNull = [];

  const handleClick = jest.fn();

  const { container } = render(
    <List tasks={taskNull} onClickDelete={handleClick} />,
  );

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('할일이 하나 이상일때', () => {
  const tasks = [
    {
      id: 1,
      title: '테스트 코드는 아주 어렵네요!',
    },
  ];
  const handleClick = jest.fn();

  const { container, getByText } = render(
    <List tasks={tasks} onClickDelete={handleClick} />,
  );

  expect(container).toHaveTextContent('테스트 코드는 아주 어렵네요!');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
