import { fireEvent, render } from '@testing-library/react';
import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '포켓몬빵 사기',
  };

  it('1. 아이템에 task title, 완료버튼 출력', () => {
    const handleClickDelete = jest.fn();
    const { container } = render(<Item
      task={task}
      onClickDelete={handleClickDelete}
    />);
    expect(container).toHaveTextContent('포켓몬빵 사기');
    expect(container).toHaveTextContent('완료');
  });

  it('2. 완료 버튼 클릭', () => {
    const handleClickDelete = jest.fn();
    const { getByText } = render(<Item
      task={task}
      onClickDelete={handleClickDelete}
    />);
    expect(handleClickDelete).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClickDelete).toBeCalledWith(1);
  });
});
