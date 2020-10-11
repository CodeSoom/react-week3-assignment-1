import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  const tasks = [
    '첫번째 할 일',
    '두번째 할 일',
  ];

  context('when tasks empty', () => {
    it('show default empty message', () => {
      const { getByText } = render(<App />);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('when two tasks', () => {
    it('onClick and update tasks', () => {
      const { getByRole, getByText } = render(<App />);

      fireEvent.change(getByRole('textbox'), { target: { value: tasks[0] } });
      fireEvent.click(getByText('추가'));
      expect(getByText(tasks[0])).toBeInTheDocument();
    });

    it('onDelete and remove tasks', () => {
      const { getByRole, getByText } = render(<App />);

      fireEvent.change(getByRole('textbox'), { target: { value: tasks[0] } });
      fireEvent.click(getByText('추가'));
      expect(getByText(tasks[0])).toBeInTheDocument();

      fireEvent.click(getByText('완료'));
      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });
});
