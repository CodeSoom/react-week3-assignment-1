import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Item from './Item';

function setup(task, handleClickDelete) {
  render(<Item
    task={task}
    onClickDelete={handleClickDelete}
  />);
  const clickDeleteButton = () => fireEvent.click(screen.getByRole('button', { name: /완료/i }));
  return { clickDeleteButton };
}

describe('Item Component는', () => {
  const mockHandleClick = jest.fn();
  const task = { id: 1, title: '뭐라도 하기' };

  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  test('task를 출력한다', () => {
    setup(task, mockHandleClick);
    expect(screen.getByText(task.title)).toBeInTheDocument();
  });

  describe('완료 버튼을 누르면', () => {
    test('onClickDelete를 실행한다', () => {
      const { clickDeleteButton } = setup(task, mockHandleClick);
      expect(mockHandleClick).not.toBeCalled();
      clickDeleteButton();
      expect(mockHandleClick).toBeCalledWith(1);
    });
  });
});
