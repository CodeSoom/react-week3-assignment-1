import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('ListTest_테스크_1', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  },
  ];

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});

test('ListTest_테스크_0', () => {
  const tasks = [
  ];

  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
