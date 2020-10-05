import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('task를 추가할 수 있다.', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '청소하기' },
    });

    fireEvent.click(screen.getByText('추가'));

    expect(screen.getByRole('list')).toHaveTextContent('청소하기');
  });

  test('task를 삭제할 수 있다.', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '청소하기' },
    });

    fireEvent.click(screen.getByText('추가'));

    fireEvent.click(screen.getByText('완료'));

    expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
    expect(screen.queryByText('청소하기')).not.toBeInTheDocument();
  });
});
