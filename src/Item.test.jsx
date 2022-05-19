import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  it('Item', () => {
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

  it('완료 button is working', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    const handleClick = jest.fn();

    const { getByText } = render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
