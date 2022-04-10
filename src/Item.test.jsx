import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  function renderItem() {
    return render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));
  }

  it('Item Click', () => {
    const { container, getByText } = renderItem();

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
