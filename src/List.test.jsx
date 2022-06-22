import { fireEvent, render } from '@testing-library/react';

import List from './List';

const handleClick = jest.fn();

beforeEach(() => {
  handleClick.mockClear();
});

test('할일이 없을때', () => {
  const taskNull = [];

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

  const { container, getByText } = render(
    <List tasks={tasks} onClickDelete={handleClick} />,
  );

  expect(container).toHaveTextContent('테스트 코드는 아주 어렵네요!');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
