import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('The task is empty', () => {
    it('할 일이 없어요! is displayed', () => {
      const tasks = [];

      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('The task is not empty', () => {
    it('Item is displayed when the task is not empty', () => {
      const tasks = [{ id: 1, title: '뭐라도 하기' }];

      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });
  });

  it('완료 button is working', () => {
    const tasks = [{ id: 1, title: '뭐라도 하기' }];

    const handleClick = jest.fn();

    const { getByText } = render(<List tasks={tasks} onClickDelete={handleClick} />);

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
