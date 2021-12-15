import { fireEvent, render } from '@testing-library/react';
import Item from '../src/Item';

test('Item', () => {
  const task = {
    id: 1,
    title: 'List1',
  };

  const handleClick = jest.fn();

  const { container, getByText } = render(<Item task={task} onClickDelete={handleClick} />);

  expect(container).toHaveTextContent('List1');
  expect(container).toHaveTextContent('완료');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('완료'));
  expect(handleClick).toBeCalledWith(1);
});
