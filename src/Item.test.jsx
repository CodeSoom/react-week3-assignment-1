import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

// Item
//  -renders Item
// 1. when click "완료" button
//  -gets id

describe('Item', () => {
  const task = {
    id: 1,
    title: '운동하기',
  };
  const handleClick = jest.fn();

  const renderItem = () => render(
    <Item
      task={task}
      onClickDelete={handleClick}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Item', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('운동하기');
    expect(container).toHaveTextContent('완료');
  });

  context('when click "완료" button', () => {
    it('gets id', () => {
      const { getByText } = renderItem();
      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClick).toBeCalledWith(1);
    });
  });
});
