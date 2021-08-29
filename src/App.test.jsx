import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const tasks = [
    '새로 할 일',
  ];

  context('when tasks empty', () => {
    it('it shows empty page', () => {
      const { getByText } = render(<App />);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('when tasks not empty', () => {
    it('it shows click button', () => {
      const { getByRole, getByText } = render(<App />);

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
