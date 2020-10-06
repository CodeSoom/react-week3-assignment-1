import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  const renderApp = () => render((
    <App />
  ));

  describe('render', () => {
    it('제목 To-do를 출력한다.', () => {
      // When
      renderApp();

      // Then
      expect(screen.getByText('To-do')).toBeInTheDocument();
    });

    it('input을 출력한다.', () => {
      // When
      renderApp();

      // Then
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    });

    it('추가 button을 출력한다.', () => {
      // When
      renderApp();

      // Then
      expect(screen.getByRole('button')).toHaveTextContent('추가');
    });

    context('tasks가 없을 때', () => {
      it('빈 메세지를 출력한다.', () => {
        // When
        renderApp();

        // Then
        expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });

    context('tasks가 있을 때', () => {
      it('tasks 목록을 출력한다.', () => {
        // Given
        renderApp();

        // When
        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: '청소하기' },
        });

        fireEvent.click(screen.getByText('추가'));

        // Then
        expect(screen.getByRole('list')).toHaveTextContent('청소하기');
      });
    });
  });

  describe('task', () => {
    context('타이핑시', () => {
      it('입력된 값이 출력된다.', () => {
        // Given
        renderApp();

        // When
        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: '청소하기' },
        });

        // Then
        expect(screen.getByRole('textbox')).toHaveValue('청소하기');
      });
    });

    context('추가시', () => {
      it('목록에 task가 출력된다.', () => {
        // Given
        renderApp();

        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: '선물사기' },
        });

        // When
        fireEvent.click(screen.getByText('추가'));

        // Then
        expect(screen.getByRole('list')).toHaveTextContent('선물사기');
      });
    });

    context('삭제시', () => {
      it('목록에서 task가 삭제된다.', () => {
        // Given
        renderApp();

        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: '운동하기' },
        });

        fireEvent.click(screen.getByText('추가'));

        // When
        fireEvent.click(screen.getByText('완료'));

        // Then
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });
  });
});
