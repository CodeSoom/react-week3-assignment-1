import { screen, render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App Test', () => {
  beforeEach(() => {
    render(<App />);
  });

  context('App 컴포넌트 렌더 테스트', () => {
    it('App를 렌더한다.', () => {
      expect(screen.getByText('To-do')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText('추가')).toBeInTheDocument();
    });
  });

  context('App 컴포넌트 동작 테스트', () => {
    beforeEach(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: '뭐라도 하기' } });
      fireEvent.click(screen.getByText('추가'));
    });

    test('Input에 입력한 값을 새로운 할 일로 추가할 수 있다.', () => {
      expect(screen.getByText('뭐라도 하기')).toBeInTheDocument();
    });

    test('목록에 존재하는 할 일을 제거할 수 있다.', () => {
      fireEvent.click(screen.getByText('완료'));
      expect(screen.queryByText('뭐라도 하기')).not.toBeInTheDocument();
    });
  });
});
