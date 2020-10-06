import React from 'react';
import { render, screen } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  const renderList = ({ tasks }) => render((
    <List
      tasks={tasks}
    />
  ));

  describe('render', () => {
    context('tasks가 없을 때', () => {
      // Given
      const tasks = [];

      it('빈 메세지를 출력한다.', () => {
        // When
        renderList({ tasks });

        // Then
        expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });

    context('tasks가 있을 때', () => {
      // Given
      const title = '복습하기';
      const tasks = [{
        id: 1,
        title,
      }];

      it('tasks 목록을 출력한다.', () => {
        // When
        renderList({ tasks });

        // Then
        expect(screen.queryByText('할 일이 없어요!')).not.toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('list')).toHaveTextContent(title);
      });
    });
  });
});
