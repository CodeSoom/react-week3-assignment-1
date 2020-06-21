import React from 'react';

// 명시적으로 render 불러옴
import { render, fireEvent } from '@testing-library/react';

// 명시적이지 않고, jest.config.js로 이를 처리함
// import '@testing-library/jest-dom';

import Item from './Item';

// 따로 알아봐야할 사항
// describe - context - it
// given

test('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  // function을 테스트할 때
  // jest에서 미리 준비한 fn(function)으로 들어감
  const handleClick = jest.fn();

  const { container, getByText } = render(
    <Item task={task} onClickDelete={handleClick} />,
  );

  // 화면에 '뭐라도 하기'와 '완료'가 있어야 한다.
  // -> container로 확인
  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('완료');

  expect(handleClick).not.toBeCalled();

  // 완료 버튼을 누르기 전에 불리지 않는다
  fireEvent.click(getByText('완료'));

  // task 1을 누를 걸 기대
  expect(handleClick).toBeCalledWith(1);
});
