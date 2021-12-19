import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render(<App />);
  }

  it('render App component', () => {
    const { getByText } = renderApp();
    expect(getByText(/추가/)).not.toBeNull();
  });

  it('test App state', () => {
    const {
      getByLabelText,
      getByText,
      container,
      getAllByText, 
    } = renderApp();

    // test change task title
    const textInput = getByLabelText('할 일');

    fireEvent.change(textInput, {
      target: { value: '코드숨 과제하기' },
    });

    expect(textInput.value).toBe('코드숨 과제하기');

    // test add task
    const button = getByText('추가');

    fireEvent.click(button);

    expect(container).toHaveTextContent('코드숨 과제하기');

    // test delte task
    const deleteButtons = getAllByText('완료');

    fireEvent.click(deleteButtons[0]);

    expect(container).not.toHaveTextContent('코드숨 과제하기');
  });
});
