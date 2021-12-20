import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

import { task } from '../fixtures/tasks';

test('Item', () => {
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
  fireEvent.click(getByText('완료'));
  expect(handleClick).toBeCalledWith(1);
});
