import { fireEvent, render } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  const renderItem = () => render(<Item task={task} onClickDelete={handleClick} />);

  it('Item에 할 일, 완료 버튼을 출력한다.', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('완료 버튼을 클릭할 때, mockClick 함수를 호출한다.', () => {
    const { getByText } = renderItem();

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClick).toBeCalledWith(task.id);
  });
});
