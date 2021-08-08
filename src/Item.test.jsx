import { render, fireEvent } from '@testing-library/react';
import Item from './Item';

describe('Item', () => {
  const handleClickDelete = jest.fn(() => {});
  function renderItem() {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    return render(<Item task={task} onClickDelete={handleClickDelete} />);
  }

  it('shows task Title', () => {
    const { container } = renderItem();
    expect(container).toHaveTextContent(/뭐라도 하기/);
  });

  it('shows taskDone button text', () => {
    const { container } = renderItem();
    expect(container).toHaveTextContent(/완료/);
  });

  it('listens onClick event', () => {
    const { getByText } = renderItem();

    expect(handleClickDelete).not.toBeCalled();

    fireEvent.click(getByText(/완료/));

    expect(handleClickDelete).toBeCalledWith(1);
  });
});
