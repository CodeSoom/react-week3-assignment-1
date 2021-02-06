import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App rendered well', () => {
  const { container, getByPlaceholderText } = render((
    <App />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
  expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('추가');
});

test('When input changed, input\'s value chaned', () => {
  const { getByLabelText } = render((
    <App />
  ));

  const input = getByLabelText('할 일');
  expect(input).toHaveTextContent('');
  fireEvent.change(input, { target: { value: '안녕하세요' } });
  expect(input.value).toBe('안녕하세요');
});

test('Add to-do', () => {
  const { container, getByLabelText, getByText } = render((
    <App />
  ));

  const input = getByLabelText('할 일');
  fireEvent.change(input, { target: { value: '안녕하세요' } });
  fireEvent.click(getByText('추가'));
  expect(container).toHaveTextContent('안녕하세요');
});

test('Add and delete to-do', () => {
  const { container, getByLabelText, getByText } = render((
    <App />
  ));

  const input = getByLabelText('할 일');
  fireEvent.change(input, { target: { value: '안녕하세요' } });
  fireEvent.click(getByText('추가'));
  fireEvent.click(getByText('완료'));
  expect(container).toHaveTextContent('할 일이 없어요!');
});
