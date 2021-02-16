import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  function renderItem() {
    const { container, getByText } = render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));

    return {
      container,
      getByText,
    };
  }

  it('renders tasks', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent(task.title);
    expect(container).toHaveTextContent('완료');

    expect(handleClick).not.toBeCalled();
  });

  it('fires handleClick with id whose button is clicked', () => {
    const { getByText } = renderItem();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
