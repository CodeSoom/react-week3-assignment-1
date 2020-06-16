import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import List from './List';

describe('List Component는', () => {
  const mockOnClickDelete = jest.fn();

  beforeEach(() => {
    mockOnClickDelete.mockClear();
  });

  describe('할 일이 없다면', () => {
    const tasks = [];

    test('안내 메시지를 출력한다', () => {
      const message = '할 일이 없어요!';

      render(<List
        tasks={tasks}
        onClickDelete={mockOnClickDelete}
      />);

      expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('출력되는 Item이 없다', () => {
      render(<List
        tasks={tasks}
        onClickDelete={mockOnClickDelete}
      />);

      expect(screen.queryByRole('listitem', { name: '' })).not.toBeInTheDocument();
    });
  });

  describe('할 일이 있다면', () => {
    const itemSize = 10;
    const tasks = [...Array(itemSize)].map((value, index) => ({ id: index + 1, title: `${index} 할 일` }));

    test('Item 리스트를 출력한다', () => {
      render(<List
        tasks={tasks}
        onClickDelete={mockOnClickDelete}
      />);

      expect(screen.getByRole('list', { name: '' }).children).toHaveLength(itemSize);
    });

    describe('Item에서 완료 버튼을 클릭했을 때', () => {
      test('onClickDelete를 실행한다', () => {
        render(<List
          tasks={tasks}
          onClickDelete={mockOnClickDelete}
        />);

        fireEvent.click(screen.getAllByRole('button', { name: /완료/i })[0]);

        expect(mockOnClickDelete).toBeCalledTimes(1);
      });
    });
  });
});
