import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const tasks = {
    id: 1,
    title: '뭐라도 하기',
  };

  const renderItem = () => render((
    <Item
      task={tasks}
      onClickDelete={handleClick}
    />
  ));

  it('item-title 을 렌더링한다', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('뭐라도 하기');
  });

  it('item-button 을 렌더링한다', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('완료');
  });

  it('click 이벤트를 listen 한다', () => {
    const { getByText } = renderItem();

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClick).toBeCalledWith(1);
  });
});
