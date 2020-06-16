import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import List from './List';

function setup(tasks, handleClickDelete) {
  render(<List
    tasks={tasks}
    onClickDelete={handleClickDelete}
  />);
  const clickDoneButton = () => fireEvent.click(screen.getAllByRole('button', { name: /완료/i })[0]);
  return { clickDoneButton };
}

describe('List Component는', () => {
  const mockHandleClickDelete = jest.fn();

  beforeEach(() => {
    mockHandleClickDelete.mockClear();
  });

  describe('할 일이 없다면', () => {
    test('안내 메시지를 출력한다', () => {
      const message = '할 일이 없어요!';
      setup([], mockHandleClickDelete);
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('출력되는 Item이 없다', () => {
      setup([], mockHandleClickDelete);
      expect(screen.queryByRole('listitem', { name: '' })).not.toBeInTheDocument();
    });
  });

  describe('할 일이 있다면', () => {
    const itemSize = 10;
    const tasks = [...Array(itemSize)].map((value, index) => ({ id: index + 1, title: `${index} 할 일` }));
    test('Item 리스트를 출력한다', () => {
      setup(tasks, mockHandleClickDelete);
      expect(screen.getByRole('list', { name: '' }).children).toHaveLength(itemSize);
    });

    describe('Item의 완료 버튼을 클릭했을 때', () => {
      test('onClickDelete를 실행한다', () => {
        const { clickDoneButton } = setup(tasks, mockHandleClickDelete);
        clickDoneButton();
        expect(mockHandleClickDelete).toBeCalledTimes(1);
      });
    });
  });
});
