import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  describe('task가 주어 진다면', () => {
    it('주어진 task와 완료 버튼이 나오는 지', () => {
      const { container } = render(<Item task={task} onClickDelete={handleClick} />);

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });
  });

  describe('task가 주어 진다면', () => {
    it('이벤트가 잘 실행되는 지', () => {
      const { container, getByText } = render(<Item task={task} onClickDelete={handleClick} />);

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('완료'));
      expect(handleClick).toBeCalledWith(1);
    });
  });
});
