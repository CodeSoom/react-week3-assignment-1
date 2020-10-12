import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('do not use tasks', () => {
    it('renders "추가" button', () => {
      const { getByText } = render((
        <App />
      ));

      expect(getByText(/추가/)).not.toBeNull();
    });
  });

  context('use tasks', () => {
    it('add task after click "추가" button', () => {
      const { getByLabelText, getByText } = render((
        <App />
      ));

      fireEvent.change(getByLabelText('할 일'), {
        target: { value: '무언가 하기' },
      });

      fireEvent.click(getByText('추가'));

      expect(getByText(/무언가 하기/)).not.toBeNull();
    });

    it('remove task after click "완료" button', () => {
      const { getByLabelText, getByText } = render((
        <App />
      ));

      fireEvent.change(getByLabelText('할 일'), {
        target: { value: '무언가 하기' },
      });

      fireEvent.click(getByText('추가'));

      expect(getByText(/무언가 하기/)).not.toBeNull();

      fireEvent.click(getByText('완료'));

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });
});
