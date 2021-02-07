import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { getByText, getByLabelText } = render((
    <App />
  ));

  fireEvent.change(getByLabelText('할 일'), {
    target: { value: '아무 것도 하지 않기' },
  });

  expect(getByText(/추가/)).not.toBeNull();

  fireEvent.click(getByText('추가'));

  expect(getByText(/아무 것도 하지 않기/)).not.toBeNull();

  fireEvent.click(getByText('완료'));

  expect(getByText('할 일이 없어요!')).not.toBeNull();
});
