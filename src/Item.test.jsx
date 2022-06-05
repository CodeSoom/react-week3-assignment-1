import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Item from './Item';

describe('Item', () => {
  context('task가 주어지면', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    const handleClick = jest.fn();

    it('title이 나오고 완료버튼이 보인다.', () => {
      const { container, getByRole } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));
      const completeButton = getByRole('button');
      expect(completeButton).toBeEnabled();
      expect(completeButton).toHaveTextContent('완료');

      expect(container).toHaveTextContent('뭐라도 하기');
    });
  });
  describe('완료버튼을 클릭했을 때', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    const handleClick = jest.fn();

    it('handleClick가 호출되어야한다.', async () => {
      const user = userEvent.setup();

      const { getByRole } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));

      const completeButton = getByRole('button');
      await user.click(completeButton);

      expect(handleClick).toBeCalledWith(1);
    });
  });
});
