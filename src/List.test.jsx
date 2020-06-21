import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('without tasks', () => {
    it('display default text', () => {
      // Given
      const tasks = [];

      const handleClick = jest.fn();

      // When
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      // Then
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('diplays tasks', () => {
      // Given
      const tasks = [{
        id: 1,
        title: '첫 번째 할 일',
      }];

      const handleClick = jest.fn();

      // When
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      // Then
      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent('완료');
    });
  });

  context('when click 완료', () => {
    it('call handleClick function', () => {
      // Given
      const tasks = [{
        id: 1,
        title: '첫 번째 할 일',
      }];

      const handleClick = jest.fn();

      // When
      const { getByText } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ));

      // Then
      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClick).toBeCalled();
    });
  });
});
