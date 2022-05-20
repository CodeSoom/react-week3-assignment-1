import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  context('task가 주어지면', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    const handleClick = jest.fn();

    it('title이 나오고 완료버튼이 있어야한다.', () => {
      const { container } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });
  });
  describe('완료버튼을 클릭했을 때', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    const handleClick = jest.fn();

    it('handleClick가 호출되어야한다.', () => {
      const { getByText } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));

      fireEvent.click(getByText('완료'));
      expect(handleClick).toBeCalledWith(1);
    });
  });
});
