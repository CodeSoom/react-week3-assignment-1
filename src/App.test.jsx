import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App Test', () => {
  test('초기 화면에는 할 일이 없어요! 라는 메시지가 보여야 한다.', () => {
    const { getByText } = render((<App />));
    expect(getByText('할 일이 없어요!')).toBeVisible();
  });

  test('추가 버튼을 있어야 한다.', () => {
    const { getByText } = render((<App />));

    expect(getByText(/추가/)).not.toBeNull();
  });

  test('추가 버튼을 클릭할 수 있다.', () => {
    const { getByText } = render((<App />));
    fireEvent.click(getByText('추가'));
  });
});
