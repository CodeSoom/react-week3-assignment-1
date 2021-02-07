import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('renders labels and change event', () => {
    const { container, getByLabelText } = renderApp();

    expect(container).toHaveTextContent('할 일');

    const label = getByLabelText('할 일');

    fireEvent.change(label, { target: { value: '아무 것도 안하기' } });
    expect(label.value).toBe('아무 것도 안하기');
  });

  it('clicks "추가" button, a task is added', () => {
    const { getByLabelText, getByText } = renderApp();

    const label = getByLabelText('할 일');

    fireEvent.change(label, { target: { value: '아무 것도 안하기' } });
    expect(label.value).toBe('아무 것도 안하기');

    fireEvent.click(getByText('추가'));
    expect(label.value).toBe('');
  });

  it('clicks "완료" button, that is deleted when pressed', () => {
    const { getByLabelText, getAllByText, getByText } = renderApp();

    const label = getByLabelText('할 일');

    fireEvent.change(label, { target: { value: '아무 것도 안하기' } });
    expect(label.value).toBe('아무 것도 안하기');

    fireEvent.click(getByText('추가'));
    expect(label.value).toBe('');

    fireEvent.click(getAllByText('완료')[0]);
    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
