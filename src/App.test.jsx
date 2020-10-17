import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('when being initialized', () => {
    it('shows no-tasks-message', () => {
      const { getByText } = render((
        <App />
      ));
      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });
  });

  context('when recieving input value', () => {
    it('shows that in inputbox', () => {
      const { getByPlaceholderText } = render((
        <App />
      ));
      const inputBox = getByPlaceholderText('할 일을 입력해 주세요');
      expect(inputBox).toHaveDisplayValue('');

      fireEvent.change(inputBox, { target: { value: '뭐라도 하기' } });
      expect(inputBox).toHaveDisplayValue('뭐라도 하기');
    });
  });

  context('when clicking "추가" button', () => {
    it('adds a task', () => {
      const { getByText, getByPlaceholderText, container } = render((
        <App />
      ));

      const inputBox = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(inputBox, { target: { value: '뭐라도 하기' } });
      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent('뭐라도 하기');
    });
  });

  context('when clicking "완료" button', () => {
    it('removes the task', () => {
      const { getByText, getByPlaceholderText } = render((
        <App />
      ));

      const inputBox = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(inputBox, { target: { value: '뭐라도 하기' } });
      fireEvent.click(getByText('추가'));
      fireEvent.click(getByText('완료'));

      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });
  });
});
