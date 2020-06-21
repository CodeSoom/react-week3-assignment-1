import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('할 일이 없을 경우', () => {
    it('초기화면과 함께 할 일이 없어요가 표시된다.', () => {
      const tasks = [];

      const { container } = render((
        <List tasks={tasks} />
      ));
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 1개 있을 경우', () => {
    it('1개의 할 일과 완료 버튼이 표시된다.', () => {
      const tasks = [
        {
          id: 1,
          title: 'do something',
        },
      ];

      const handleClick = jest.fn();

      const { container, getByText } = render((
        <List tasks={tasks} onClickDelete={handleClick} />
      ));
      expect(container).toHaveTextContent('do something');
      expect(container).toHaveTextContent('완료');

      expect(handleClick).not.toBeCalledWith();

      fireEvent.click(getByText('완료'));

      expect(handleClick).toBeCalledWith(1);
    });
  });

  context('할 일이 n개 있을 경우', () => {
    it('n개의 할 일과 완료 버튼이 표시된다.', () => {
      const tasks = [...Array(10)].map((_, i) => (
        {
          id: i,
          title: `do something ${i}`,
        }
      ));

      const handleClick = jest.fn();

      const { container, getAllByText } = render((
        <List tasks={tasks} onClickDelete={handleClick} />
      ));

      expect(container).toHaveTextContent('완료');

      getAllByText('완료').forEach((button, i) => {
        expect(container).toHaveTextContent(`do something ${i}`);

        expect(handleClick).not.toBeCalledWith();

        fireEvent.click(button);

        expect(handleClick).toBeCalledWith(i);
      });
    });
  });
});
