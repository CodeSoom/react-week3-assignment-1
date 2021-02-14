import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('render App', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('render input to write task', () => {
    const { getByLabelText } = renderApp();

    const input = getByLabelText('할 일');

    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: '비가 오는 날엔 부침개' } });

    expect(input).toHaveValue('비가 오는 날엔 부침개');
  });

  it('render button "추가" to add task', () => {
    const { getByText, getByLabelText } = renderApp();

    const addButton = getByText('추가');

    const input = getByLabelText('할 일');

    fireEvent.change(input, { target: { value: '비가 오는 날엔 부침개' } });

    fireEvent.click(addButton);

    expect(getByText('비가 오는 날엔 부침개')).not.toBeNull();
  });

  it('render button "완료" to delete task', () => {
    const {
      getByText, getByLabelText, getAllByText, queryByText,
    } = renderApp();

    const addButton = getByText('추가');
    const input = getByLabelText('할 일');

    function addTask(task) {
      fireEvent.change(input, { target: { value: task } });

      fireEvent.click(addButton);
    }

    addTask('비가 오는 날엔 부침개');
    addTask('사이다도 한 잔');

    const deleteButtons = getAllByText('완료');

    fireEvent.click(deleteButtons[1]);

    expect(queryByText('사이다도 한 잔')).toBeNull();
  });
});
