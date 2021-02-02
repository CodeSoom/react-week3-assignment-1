import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

const setupBeforeAddTask = () => {
  const utils = render(<App />);

  const input = utils.getByLabelText('할 일');
  const addButton = utils.getByText('추가');
  return {
    input,
    addButton,
    ...utils,
  };
};

const setupAfterAddTask = () => {
  const { input, addButton, ...utils } = setupBeforeAddTask();

  fireEvent.change(input, { target: { value: '아무것도 하지 않기' } });
  fireEvent.click(addButton);
  const doneButton = utils.getByText('완료');

  return {
    input,
    addButton,
    doneButton,
    ...utils,
  };
};

test('App should update input value when value changes', () => {
  const { input } = setupBeforeAddTask();
  fireEvent.change(input, { target: { value: '아무것도 하지 않기' } });
  expect(input.value).toBe('아무것도 하지 않기');
});

test('App should add task when add button is clicked', () => {
  const { container, input, addButton } = setupBeforeAddTask();
  fireEvent.change(input, { target: { value: '아무것도 하지 않기' } });
  fireEvent.click(addButton);
  expect(container).toHaveTextContent('아무것도 하지 않기');
});

test('App should delete task when done button is clicked', () => {
  const { container, doneButton } = setupAfterAddTask();
  fireEvent.click(doneButton);
  expect(container).not.toHaveTextContent('아무것도 하지 않기');
});
