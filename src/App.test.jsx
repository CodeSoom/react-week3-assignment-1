import {
  render,
} from '@testing-library/react';
import App from './App';

describe('App', () => {
  context('웹 페이지에 접속하면', () => {
    it('App를 렌더링한다', () => {
      const { container } = render(<App />);
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
