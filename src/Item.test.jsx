import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  it('전달받은 task의 title이 노출되어야한다.', () => {
    const { container } = render(
      <Item task={task} onClickDelete={handleClick} />,
    );

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('완료버튼 클릭시 삭제이벤트 핸들러가 전달받은 id과 함께 실행되어야한다.', () => {
    const { getByText } = render(
      <Item task={task} onClickDelete={handleClick} />,
    );

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClick).toBeCalledWith(1);
  });
});
