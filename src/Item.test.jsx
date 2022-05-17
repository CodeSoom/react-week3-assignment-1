import { fireEvent, render } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  const renderItem = () => render(<Item task={task} onClickDelete={handleClick} />);

  it('Item에 taskTitle, 완료 버튼이 출력되어야 한다.', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  context('완료 버튼을 클릭했을 때', () => {
    it('mockClick 함수가 호출되어야 한다.', () => {
      const { getByText } = renderItem();

      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(handleClick).toBeCalledWith(1);
    });
  });
});
