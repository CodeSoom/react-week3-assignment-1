import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { getByText, getByLabelText } = render((<App />));

  expect(getByText('추가')).not.toBeNull();
  fireEvent.change(getByLabelText('할 일'), { target: { value: '할 일1' } });

  fireEvent.click(getByText('추가'));

  expect(getByText('할 일1')).toBeTruthy();

  fireEvent.click(getByText('완료'));
  expect(getByText('할 일이 없어요!')).toBeTruthy();
});
