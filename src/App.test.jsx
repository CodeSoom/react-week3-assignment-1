import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('Renders', () => {
    render((
      <App />
    ));

    expect(screen.getByText('To-do')).toBeInTheDocument();
  });

  test('할 일 입력하고 추가하면 리스트에 표시', () => {
    render((
      <App />
    ));

    fireEvent.change(screen.getByLabelText('할 일'), { target: { value: '아무 것도 하지 않기' } });
    fireEvent.click(screen.getByText('추가'));

    expect(screen.getByText('아무 것도 하지 않기')).toHaveTextContent('완료');
  });

  test('할 일 입력하고 추가한 뒤에 지우면 리스트에서 삭제', () => {
    render((
      <App />
    ));

    fireEvent.change(screen.getByLabelText('할 일'), { target: { value: '아무 것도 하지 않기' } });
    fireEvent.click(screen.getByText('추가'));

    expect(screen.getByText('아무 것도 하지 않기')).toHaveTextContent('완료');

    fireEvent.click(screen.getByText('완료'));

    expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
