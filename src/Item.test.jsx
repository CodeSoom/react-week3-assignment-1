import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item component', () => {
  const handleClick = jest.fn();

  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const setup = () => render((
    <Item
      task={task}
      onClickDelete={handleClick}
    />
  ));

  it('Item render', () => {
    const { container } = setup();

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('handleClick is called at change event', () => {
    const { getByText } = setup();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
