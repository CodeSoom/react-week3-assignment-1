import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('listens change event', () => {
    const { getByLabelText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트 하기' } });

    expect(getByLabelText('할 일').value).toBe('홈트 하기');
  });

  it('listens "추가" button click event', () => {
    const {
      getByLabelText, getByText,
    } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트하기' } });
    fireEvent.click(getByText('추가'));

    expect(getByLabelText('할 일').value).toBe('');
    expect(getByText('홈트하기')).toBeInTheDocument();
  });

  it('listens "완료" button click event', () => {
    const {
      getByLabelText, getByText, getAllByText,
    } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '홈트하기' } });

    fireEvent.click(getByText('추가'));

    fireEvent.click(getAllByText('완료')[0]);

    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
