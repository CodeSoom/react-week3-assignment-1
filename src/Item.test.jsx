import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from './Item';

test('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Item
      task={task}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('완료');

  expect(handleClick).not.toBeCalled();

  userEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
