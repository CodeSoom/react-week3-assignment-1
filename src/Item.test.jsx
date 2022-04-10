import { render, fireEvent, screen } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleDelete = jest.fn();

  beforeEach(() => {
    render(<Item task={task} onClickDelete={handleDelete} />);
  });

  context('Item 컴포넌트 렌더 테스트', () => {
    it('화면에 Task와 버튼을 렌더한다.', () => {
      const text = screen.getByText('뭐라도 하기');
      const button = screen.getByRole('button');

      expect(text).toBeVisible();
      expect(button).toBeVisible();
    });
  });

  context('Item 컴포넌트 기능 테스트', () => {
    it('완료 버튼 클릭 시, handleDelete 함수가 실행되어야 한다.', () => {
      const button = screen.getByRole('button');

      expect(handleDelete).not.toBeCalled();
      fireEvent.click(button);
      expect(handleDelete).toBeCalledWith(1);
    });
  });
});
