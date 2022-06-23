import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('Item을 렌더링 한다', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    const { container, getByText } = render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
