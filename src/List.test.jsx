import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('without tasks', () => {
    it('shows 할 일이 없어요!', () => {
      const tasks = [];

      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('shows items', () => {
      const tasks = [{ id: 1, title: '뭐라도 하기' }, { id: 2, title: '청소' }];

      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('청소');
      expect(container).toHaveTextContent('완료');
    });
  });

  it('deletes the taks', () => {
    const tasks = [{ id: 1, title: '뭐라도 하기' }];

    const handleClick = jest.fn();

    const { getByText } = render(<List tasks={tasks} onClickDelete={handleClick} />);

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
