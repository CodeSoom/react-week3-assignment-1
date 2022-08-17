import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('<Item/>', () => {
  const handleClick = jest.fn();

  context('with task', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    it('should renders', () => {
      const { container } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));
      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });

    it('should be able to click "완료" button', () => {
      const { getByText } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(handleClick).toBeCalledWith(1);
    });
  });
});
