import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('render app', () => {
    const { getByText, getAllByText } = renderApp();

    expect(getByText(/추가/)).not.toBeNull();
    expect(getAllByText(/할 일이 없어요/)).not.toBeNull();
  });

  it('change title', () => {
    const { getByRole } = renderApp();

    fireEvent.change(getByRole('textbox'), { target: { value: '가나다' } });
  });

  it('add task', () => {
    const { getAllByText } = renderApp();
    const buttons = getAllByText('추가');

    fireEvent.click(buttons[0]);
  });

  it('delete task', () => {
    const { getByLabelText, getAllByText, getByRole } = renderApp();

    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: '테스트',
      },
    });

    fireEvent.click(getByRole('button', { name: '추가' }));

    const buttons = getAllByText('완료');
    fireEvent.click(buttons[0]);
  });
});
