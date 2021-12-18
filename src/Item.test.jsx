import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const mockClick = jest.fn();

  function createTestComponent(task = { id: '', title: '' }) {
    return render((
      <Item
        task={task}
        onClickDelete={mockClick}
      />
    ));
  }

  it('task의 title이 출력된다', () => {
    // given
    const expectTitle = '뭐라도 하기';
    const task = {
      title: expectTitle,
    };

    // when
    const { container } = createTestComponent(task);

    // then
    expect(container).toHaveTextContent(expectTitle);
  });

  it('버튼을 클릭하면 해당 함수가 1회 호출된다', () => {
    // given
    const { getByRole } = createTestComponent();
    const sut = getByRole('button');

    // when
    fireEvent.click(sut);

    expect(mockClick).toBeCalledTimes(1);
  });
});
