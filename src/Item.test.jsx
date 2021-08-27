import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: 'Do anything you want',
  };
  const handleClick = jest.fn();

  test('task의 title을 포함한 리스트를 완료 버튼과 함께 생성한다.', () => {
    const { container } = render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));

    expect(container).toHaveTextContent('Do anything you want');
    expect(container).toHaveTextContent('완료');
  });

  test('완료 버튼을 누르면 Click 이벤트가 실행된다.', () => {
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
