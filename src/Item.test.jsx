import { render, fireEvent, cleanup } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows task item correctly', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    const { container } = render((
      <Item
        task={task}
      />
    ));

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('handles handleClickDelete when `완료` button clicked', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    const handleClickDelete = jest.fn();

    const { getByText } = render((
      <Item
        task={task}
        onClickDelete={handleClickDelete}
      />
    ));

    expect(handleClickDelete).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClickDelete).toBeCalledWith(1);
  });
});
