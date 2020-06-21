import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  context('without task', () => {
    it('no display', () => {});
  });

  context('with task', () => {
    it('display task', () => {
      // Given
      const task = {
        id: 1,
        title: '뭐라도 하기',
      };

      const handleClick = jest.fn();

      // When
      const { container } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));

      // Then
      expect(container).toHaveTextContent(task.title);
      expect(container).toHaveTextContent('완료');
    });
  });

  context('완료 button click', () => {
    it('call handleClick function', () => {
      // Given
      const task = {
        id: 1,
        title: '뭐라도 하기',
      };

      const handleClick = jest.fn();

      // When
      const { getByText } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));

      // Then
      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClick).toBeCalledWith(1);
    });
  });
});
