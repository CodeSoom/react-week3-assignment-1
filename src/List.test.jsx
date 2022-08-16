import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  context('tasks 가 존재한다면', () => {
    it('title이 보인다.', () => {
      const tasks = [
        { id: 1, title: '뭐라도 하기' },
        { id: 2, title: '코드숨 과제' },
      ];

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
  });

  context('완료 버튼을 누른다면', () => {
    it('각각의 버튼에 함수가 동작한다.', () => {
      const tasks = [
        { id: 1, title: '뭐라도 하기' },
        { id: 2, title: '코드숨 과제' },
      ];

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

  context('tasks가 비어있다면', () => {
    it('할 일이 없어요! 가 보인다', () => {
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
