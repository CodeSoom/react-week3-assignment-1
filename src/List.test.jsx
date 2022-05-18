import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('할 일이 없어요! is displayed when tasks is empty', () => {
  const tasks = [];

  const { container } = render(<List tasks={tasks} />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('Item is displayed when the task is not empty', () => {
  const tasks = [{ id: 1, title: '뭐라도 하기' }];

  const { container } = render(<List tasks={tasks} />);

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('완료');
});

test('onClickDelete is called when 완료 button is clicked', () => {
  const tasks = [{ id: 1, title: '뭐라도 하기' }];

  const handleClick = jest.fn();

  const { getByText } = render(<List tasks={tasks} onClickDelete={handleClick} />);

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
