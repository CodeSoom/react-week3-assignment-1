import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((<App />));

  it('initial', () => {
    const { container, getByText } = renderApp();
    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(getByText(/추가/)).not.toBeNull();
  });

  it('새로운 할 일 추가 후 완료하기.', () => {
    const { getByLabelText, getAllByText, getByText } = renderApp();
    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: '새로운 할일',
      },
    });
    fireEvent.click(getByText('추가'));
    expect(getByText(/새로운 할일/)).not.toBeNull();

    const buttons = getAllByText('완료');
    fireEvent.click(buttons[0]);
    expect(getByText(/할 일이 없어요!/)).not.toBeNull();
  });
});
