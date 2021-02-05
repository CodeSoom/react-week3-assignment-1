import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const handleClickDelete = jest.fn();

  const dummyTask = {
    id: 1,
    title: 'TDD 너 참 어렵다',
  };

  const renderItem = (task = {}) => render((
    <Item
      task={task}
      onClickDelete={handleClickDelete}
    />
  ));

  it('renders title of the tasks', () => {
    const { container } = renderItem(dummyTask);

    expect(container).toHaveTextContent('TDD 너 참 어렵다');
  });

  it('has text 완료 in button', () => {
    const { getByText } = renderItem();

    const button = getByText('완료');

    expect(button).toHaveTextContent('완료');
  });

  it('clicks 완료 button in order to delete the task', () => {
    const { getByText } = renderItem();

    fireEvent.click(getByText('완료'));

    expect(handleClickDelete).toBeCalled();
  });
});
