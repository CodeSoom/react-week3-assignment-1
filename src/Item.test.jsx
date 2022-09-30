import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = { id: 1, title: '할일1' };
  const onClickDelete = jest.fn();

  it('Task가 존재하면 Task Title이 출력된다', () => {
    const { container, getByText } = render((
      <Item
        task={task}
        onClickDelete={onClickDelete}
      />
    ));
    expect(container).toHaveTextContent('할일1');
  });

  it('Task가 존재하면 완료 버튼이 생성된다 ', () => {
    const { container, getByText } = render((
      <Item
        task={task}
        onClickDelete={onClickDelete}
      />
    ));
    expect(container).toHaveTextContent('완료');
  });

  it('완료 버튼이 누르면 눌러진다. ', () => {
    const { container, getByText } = render((
      <Item
        task={task}
        onClickDelete={onClickDelete}
      />
    ));
    fireEvent.click(getByText('완료'));

    expect(onClickDelete).toBeCalled();
  });
});
