import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from './Item';

test('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  render((
    <Item
      task={task}
      onClickDelete={handleClick}
    />
  ));

  expect(screen.getByText('뭐라도 하기')).toBeInTheDocument();
  expect(screen.getByText('완료')).toBeInTheDocument();

  expect(handleClick).not.toBeCalled();

  userEvent.click(screen.getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
