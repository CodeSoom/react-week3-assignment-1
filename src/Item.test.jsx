import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item 컴포넌트', () => {
  describe('Given : task가 주어지면', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    const handleClick = jest.fn();

    test('When : 이벤트가 발생했을 때', () => {
      const { container, getByText } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('완료'));
      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
