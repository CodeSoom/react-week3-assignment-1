import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const value = 'TDD 너무 재밌다';

  const renderApp = () => render((
    <App />
  ));

  function changeInputValue(inputNode, targetValue) {
    fireEvent.change(inputNode, {
      target: {
        targetValue,
      },
    });
    return null;
  }

  it(('updates value upon changing of input value'), () => {
    const { getByLabelText } = renderApp();

    const inputNode = getByLabelText('할 일');
    changeInputValue(inputNode, value);

    expect(inputNode).toHaveValue(value);
  });

  it('adds a task to tasks upon Clicking 추가 button', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText('할 일');
    const buttonNode = getByText('추가');

    changeInputValue(inputNode, value);

    fireEvent.click(buttonNode);

    expect(container).toHaveTextContent(value);
    expect(inputNode).toHaveValue('');
  });

  it('removes the task from tasks upon clicking 완료 button along the task', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText('할 일');
    const addButtonNode = getByText('추가');

    changeInputValue(inputNode, value);

    fireEvent.click(addButtonNode);

    expect(container).toHaveTextContent(value);

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent(value);
  });
});
