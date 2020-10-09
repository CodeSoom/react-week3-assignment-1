import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

test('Item', () => {
  // Given
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

  it('제거 버튼 클릭 시, onClickDelete가 호출된다.', () => {
    expect(container).toHaveTextContent('뭐라도 하기');
    expect(handleClick).not.toBeCalled();
    // When
    fireEvent.click(getByText('완료'));
    // Then
    expect(handleClick).toBeCalledWith(1);
  });
});
