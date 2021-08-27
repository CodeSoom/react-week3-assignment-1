import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const tasks = [
    '새로 할 일',
  ];

  context('tasks are empty', () => {
    it('it shows empty page', () => {
      const { getByText } = render(<App />);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('tasks are not empty', () => {
    it('it shows click button', () => {
      const { getByRole, getByText } = render(<App />);

      // 계속해서 getByTestId로 구현할려고 했는데
      // 공식문서를 참고하니 getByRole로 접근이 가능했다.
      // 처음에는 모르고 getByRole('text') 로 했다가 에러메세지를 보고 textbox로 수정
      fireEvent.change(getByRole('textbox'), { target: { value: tasks[0] } });
      fireEvent.click(getByText('추가'));
      expect(getByText(tasks[0])).toBeInTheDocument();
    });

    it('it shows delete button', () => {
      const { getByRole, getByText } = render(<App />);

      fireEvent.change(getByRole('textbox'), { target: { value: tasks[0] } });
      fireEvent.click(getByText('추가'));
      expect(getByText(tasks[0])).toBeInTheDocument();

      fireEvent.click(getByText('완료'));
      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });
});
