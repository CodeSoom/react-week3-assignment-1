import React from 'react';
import { render, screen } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  describe('render', () => {
    context('tasks가 없을 때', () => {
      it('빈 메세지를 출력한다.', () => {
        // Given
        const tasks = [];

        // When
        render(
          <List
            tasks={tasks}
          />,
        );

        // Then
        expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });

    context('tasks가 있을 때', () => {
      it('tasks 목록을 출력한다.', () => {
        // Given
        const title = '복습하기';
        const tasks = [{
          id: 1,
          title,
        }];

        // When
        render(
          <List
            tasks={tasks}
          />,
        );

        // Then
        expect(screen.queryByText('할 일이 없어요!')).not.toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('list')).toHaveTextContent(title);
      });
    });
  });
});
