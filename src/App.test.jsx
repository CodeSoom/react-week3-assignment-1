import { screen, render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App Test', () => {
  test('App를 렌더한다.', () => {
    render(
      <App />,
    );

    expect(screen.getByText('To-do')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('추가')).toBeInTheDocument();
  });

  test('Input에 입력한 값을 새로운 할 일로 추가할 수 있다.', () => {
    render(
      <App />,
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '뭐라도 하기' } });
    fireEvent.click(screen.getByText('추가'));
    expect(screen.getByText('뭐라도 하기')).toBeInTheDocument();
  });

  test('목록에 존재하는 할 일을 제거할 수 있다.', () => {
    render(
      <App />,
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '뭐라도 하기' } });
    fireEvent.click(screen.getByText('추가'));
    expect(screen.getByText('뭐라도 하기')).toBeInTheDocument();
    fireEvent.click(screen.getByText('완료'));
    expect(screen.queryByText('뭐라도 하기')).not.toBeInTheDocument();
  });
});
