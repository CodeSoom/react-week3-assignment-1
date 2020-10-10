import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('추가 버튼을 클릭하면', () => {
    it('목록이 추가된다', () => {
      const taskTitle = '테스트 코드 작성';
      const { container, getByText } = render(<App taskTitle={taskTitle} />);

      fireEvent.click(getByText('추가'));
      expect(container).toHaveTextContent('테스트 코드 작성');
    });
  });
});
