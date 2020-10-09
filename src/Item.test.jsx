import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

const task = {
  id: 1,
  title: '블로그 글쓰기',
};
const handleClick = jest.fn();
const renderItem = () => render(
  <Item
    task={task}
    onClickDelete={handleClick}
  />,
);

test('컴포넌트 렌딩 시, labal, placeholder, button 텍스트를 출력한다.', () => {
  const { container } = renderItem();

  expect(container).toHaveTextContent('블로그 글쓰기');
});

test('제거 버튼 클릭 시, onClickDelete가 호출된다.', () => {
  const { getByText } = renderItem();

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
