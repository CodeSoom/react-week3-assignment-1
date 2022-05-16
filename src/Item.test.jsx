import { fireEvent, render } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const mockClick = jest.fn();

  function renderItem() {
    return render(<Item task={task} onClickDelete={mockClick} />);
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('1. Item에 taskTitle, 완료 버튼이 출력되어야 한다.', () => {
    const { container } = renderItem();

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  context('2. 완료 버튼을 클릭했을 때', () => {
    it('2.1. mockClick 함수가 호출되어야 한다.', () => {
      const { getByText } = renderItem();

      expect(mockClick).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(mockClick).toBeCalledWith(1);
    });
  });
});
