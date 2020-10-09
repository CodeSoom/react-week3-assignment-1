import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

test('컴포넌트 렌딩 시, labal, placeholder, button 텍스트를 표시한다', () => {
  // Given
  const { container, getByText } = render(<Item />);

  // When
  // Then
  expect(container).toHaveTextContent('뭐라도 하기');
});

test('제거 버튼 클릭 시, onClickDelete가 호출된다.', () => {
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

  expect(handleClick).not.toBeCalled();
  // When
  fireEvent.click(getByText('완료'));
  // Then
  expect(handleClick).toBeCalledWith(1);
});
