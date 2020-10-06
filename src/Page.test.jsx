import React from 'react';
import { render, screen } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const renderPage = ({ tasks }) => render((
    <Page
      tasks={tasks}
    />
  ));

  describe('render', () => {
    // Given
    const emptyTasks = [];

    it('제목 To-do를 출력한다.', () => {
      // When
      renderPage({ tasks: emptyTasks });

      // Then
      expect(screen.getByText('To-do')).toBeInTheDocument();
    });

    it('input을 출력한다.', () => {
      // When
      renderPage({ tasks: emptyTasks });

      // Then
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    });

    it('추가 button을 출력한다.', () => {
      // When
      renderPage({ tasks: emptyTasks });

      // Then
      expect(screen.getByRole('button')).toHaveTextContent('추가');
    });

    context('tasks가 없을 때', () => {
      it('빈 메세지를 출력한다.', () => {
        // When
        renderPage({ tasks: emptyTasks });

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
        renderPage({ tasks });

        // Then
        expect(screen.queryByText('할 일이 없어요!')).not.toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('list')).toHaveTextContent(title);
      });
    });
  });
});
