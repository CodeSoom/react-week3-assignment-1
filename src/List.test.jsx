import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('<List/>', () => {
  const handleClick = jest.fn();

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '뭐라도 하기' },
      { id: 2, title: '코드숨 과제' },
    ];

    it('should renders tasks', () => {
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('코드숨 과제');
      expect(container).toHaveTextContent('완료');
    });

    it('should "완료" button clickable', () => {
      const { getAllByText } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      expect(handleClick).not.toBeCalled();

      const buttons = getAllByText('완료');
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[1]);

      expect(handleClick).toBeCalledWith(1);
      expect(handleClick).toBeCalledWith(2);
    });
  });

  context('without tasks', () => {
    it('should renders "할 일이 없어요!"', () => {
      const tasks = [];

      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
