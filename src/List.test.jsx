import { render, fireEvent } from '@testing-library/react';
import List from './List';

test('List empty', () => {
  const { container } = render(<List tasks={[]} />);
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List', () => {
  const { container } = render(<List tasks={[{ id: 1, title: '일어나기' }]} />);
  expect(container).toHaveTextContent('일어나기');
});

const handleClickDelete = jest.fn();

test('List click delete', () => {
  const { getByText } = render(<List tasks={[{ id: 1, title: '일어나기' }]} onClickDelete={handleClickDelete} />);
  expect(handleClickDelete).not.toBeCalled();
  fireEvent.click(getByText('완료'));
  expect(handleClickDelete).toBeCalledWith(1);
});
