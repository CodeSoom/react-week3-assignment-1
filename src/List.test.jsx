import { render, fireEvent, screen } from '@testing-library/react';

import List from './List';

describe('List Test', () => {
  const handleClick = jest.fn();

  const existTasks = [{
    id: 1,
    title: '뭐라도 하기',
  }];

  const emptyTasks = [];

  context('List 컴포넌트 렌더 테스트', () => {
    it('화면에 할 일 목록을 렌더한다.', () => {
      render(<List tasks={existTasks} onClickDelete={handleClick} />);

      const text = screen.getByText('뭐라도 하기');

      expect(text).toBeVisible();
    });
  });

  context('List 컴포넌트 기능 테스트', () => {
    it('할 일이 존재하지 않을 때 "할 일이 없어요!"라는 텍스트를 렌더한다.', () => {
      render(<List tasks={emptyTasks} onClickDelete={handleClick} />);

      const text = screen.getByText('할 일이 없어요!');

      expect(text).toBeVisible();
    });

    it('완료 버튼을 눌렀을 떄 handleClick 함수가 실행되어야 한다.', () => {
      render(<List tasks={existTasks} onClickDelete={handleClick} />);

      expect(handleClick).not.toBeCalled();
      fireEvent.click(screen.getByText('완료'));
      expect(handleClick).toBeCalledWith(1);
    });
  });
});
