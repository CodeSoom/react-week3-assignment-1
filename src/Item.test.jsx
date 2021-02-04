import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  function renderItem() {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    const handleClick = jest.fn();

    const { container, getByText } = render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));

    return {
      container,
      getByText,
      handleClick,
    };
  }

  it('shows tasks', () => {
    const { container, handleClick } = renderItem();

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');

    expect(handleClick).not.toBeCalled();
  });

  it('fires handleClick with id whose button is clicked', () => {
    const { getByText, handleClick } = renderItem();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
