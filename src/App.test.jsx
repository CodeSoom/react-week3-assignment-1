import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const { container } = render((
    <App />
  ));
  context('App을 본다', () => {
    it('화면의 요소 확인', () => {
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
