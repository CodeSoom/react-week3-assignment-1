import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    { id: 1, title: '뭐라도 하기' },
    { id: 2, title: '코드숨 과제' },
  ];

  const handleClick = jest.fn();

  const { container, getAllByText, rerender } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('코드숨 과제');
  expect(container).toHaveTextContent('완료');

  expect(handleClick).not.toBeCalled();

  const buttons = getAllByText('완료');
  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);

  expect(handleClick).toBeCalledWith(1);
  expect(handleClick).toBeCalledWith(2);

  tasks.length = 0;
  rerender((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');

});
