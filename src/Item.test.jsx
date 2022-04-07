import { fireEvent, render } from '@testing-library/react';
import Item from './Item';

function TestItem({ task, onClickDelete }) {
  return (
    <Item
      task={task}
      onClickDelete={onClickDelete}
    />
  );
}

const setup = () => {
  const handleClick = jest.fn();
  const task = {
    id: 1,
    title: '포켓몬빵 사기',
  };
  const utils = render(<TestItem task={task} onClickDelete={handleClick} />);

  return {
    handleClick,
    ...utils,
  };
};

describe('Item', () => {
  it('아이템에 task, 완료버튼 출력 테스트', () => {
    const { container } = setup();
    expect(container).toHaveTextContent('포켓몬빵 사기');
    expect(container).toHaveTextContent('완료');
  });

  it('완료 버튼 클릭 테스트', () => {
    const { handleClick, getByText } = setup();
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClick).toBeCalledWith(1);
  });
});
