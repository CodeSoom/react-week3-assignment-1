import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(
    <App />,
  );

  it('renders button and "empty list message"', () => {
    const { getByText } = renderApp();

    expect(getByText('추가')).not.toBeNull();
    expect(getByText('할 일이 없어요')).not.toBeNull();
  });

  it('change input value', () => {
    const { getByLabelText } = renderApp();

    const input = getByLabelText('할 일');

    fireEvent.change(input, {
      target: { value: '무언가 하기' },
    });

    expect(input).toHaveAttribute('value', '무언가 하기');
  });

  it('add task', () => {
    const { getByLabelText, getByText } = renderApp();

    const input = getByLabelText('할 일');

    fireEvent.change(input, {
      target: { value: '아무거나 하기' },
    });

    expect(input).toHaveAttribute('value', '아무거나 하기');

    const button = getByText('추가');
    fireEvent.click(button);

    expect(getByText('아무거나 하기')).not.toBeNull();
  });

  it('delete task', () => {
    const { getByLabelText, getByText } = renderApp();

    const input = getByLabelText('할 일');

    fireEvent.change(input, {
      target: { value: '아무거나 하기' },
    });

    expect(input).toHaveAttribute('value', '아무거나 하기');

    const addButton = getByText('추가');
    fireEvent.click(addButton);

    const deleteButton = getByText('완료');
    fireEvent.click(deleteButton);

    expect(getByText('할 일이 없어요')).not.toBeNull();
  });
});
