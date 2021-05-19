import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App 컴포넌트', () => {
  it('할 일 추가하기', () => {
    const { getByText, getByLabelText } = render(
      (
        <App />
      ),
    );

    fireEvent.change(getByLabelText('할 일'), { target: { value: '멋대로 살기' } });
    fireEvent.click(getByText('추가'));
    expect(getByText('멋대로 살기')).toHaveTextContent('멋대로 살기');
  });

  it('할 일 추가 후 완료하여 할 일 제거하기', () => {
    const { getByText, getByLabelText } = render(
      (
        <App />
      ),
    );

    fireEvent.change(getByLabelText('할 일'), { target: { value: '멋대로 살기' } });
    fireEvent.click(getByText('추가'));
    fireEvent.click(getByText('완료'));
    expect(getByText('할 일이 없어요!')).toHaveTextContent('할 일이 없어요!');
  });
});
