import { fireEvent, render } from '@testing-library/react';
import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '포켓몬빵 사기',
  };

  const handleClickDelete = jest.fn();
  function renderItem() {
    return render((
      <Item
        task={task}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('1. 아이템에 task title, 완료버튼 출력', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('포켓몬빵 사기');
    expect(container).toHaveTextContent('완료');
  });

  it('2. 완료 버튼 클릭', () => {
    const { getByText } = renderItem();

    expect(handleClickDelete).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClickDelete).toBeCalledWith(1);
  });
});
