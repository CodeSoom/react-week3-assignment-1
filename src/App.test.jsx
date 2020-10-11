import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  const tasks = [
    '첫번째 할 일',
    '두번째 할 일',
  ];

  context('Initialize', () => {
    it('show message 할 일이 없어요!', () => {
      const { getByText } = render(
        <App />,
      );

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('onClick', () => {
    it('update to tasks', () => {
      const { getByRole, getByText } = render(
        <App />,
      );

      fireEvent.change(getByRole('textbox'), { target: { value: tasks[0] } });
      fireEvent.click(getByText('추가'));

      expect(getByText(tasks[0])).toBeInTheDocument();
    });
  });

  context('onDelete', () => {
    it('remove to tasks', () => {
      const { getByRole, getByText } = render(
        <App />,
      );

      fireEvent.change(getByRole('textbox'), { target: { value: tasks[0] } });
      fireEvent.click(getByText('추가'));

      expect(getByText(tasks[0])).toBeInTheDocument();

      fireEvent.click(getByText('완료'));
      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });
});
