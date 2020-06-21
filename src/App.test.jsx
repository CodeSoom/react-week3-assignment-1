import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('test about text', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
  it('when text changed', () => {
    const { getByPlaceholderText } = render((
      <App />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeEnabled();
    fireEvent.change(input, { target: { value: 'something' } });
    expect(input.value).toBe('something');
  });
  context('when click functions', () => {
    it('handle click add task', () => {
      const { container, getByPlaceholderText, getByText } = render((
        <App />
      ));
      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: 'something' } });

      const addButton = getByText('추가');
      expect(addButton).toBeEnabled();
      fireEvent.click(addButton);
      expect(container).not.toHaveTextContent('할 일이 없어요!');
      expect(container).toHaveTextContent('something');
      expect(container).toHaveTextContent('완료');
    });
    it('handle click delete task', () => {
      const { container, getByPlaceholderText, getByText } = render((
        <App />
      ));
      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: 'something' } });
      const addButton = getByText('추가');
      fireEvent.click(addButton);

      const completeButton = getByText('완료');
      expect(completeButton).toBeEnabled();
      fireEvent.click(completeButton);
      expect(container).not.toHaveTextContent('something');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
