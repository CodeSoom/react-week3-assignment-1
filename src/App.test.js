import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('tasks are empty', () => {
    it('it shows empty page', () => {
      const { getByText } = render(<App />);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('tasks are not empty', () => {
    it('it shows click add', () => {
      const { getByText } = render(<App />);

      fireEvent.click(getByText('추가'));
    });
  });

  it('it deletes tasks', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('추가'));

    fireEvent.click(getByText('완료'));
  });
});
