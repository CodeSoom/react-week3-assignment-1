import { render, fireEvent } from '@testing-library/react';
import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClickDelete = jest.fn(() => {
  });

  it('shows task.Title', () => {
    const { container } = render(
      <Item task={task} onClickDelete={handleClickDelete} />,
    );
    expect(container).toHaveTextContent('뭐라도 하기');
  });

  it('shows taskDone button text', () => {
    const { container } = render(
      <Item task={task} onClickDelete={handleClickDelete} />,
    );
    expect(container).toHaveTextContent('완료');
  });

  it('is clicked with handleClickDelete', () => {
    const { getByText } = render(
      <Item task={task} onClickDelete={handleClickDelete} />,
    );
    expect(handleClickDelete).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClickDelete).toBeCalledWith(1);
  });
});
