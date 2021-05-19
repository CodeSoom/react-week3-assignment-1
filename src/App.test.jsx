import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App 컴포넌트', () => {
  it('할 일 추가하고 할 일 완료하기', () => {
    const { container, getByText, getByLabelText } = render(
      (
        <App />
      ),
    );

    const todo = getByLabelText('할 일');

    fireEvent.change(todo, { target: { value: '멋대로 살기' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('멋대로 살기');
    expect(container).toHaveTextContent('완료');

    fireEvent.click(getByText('완료'));

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  })
});

