import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const testText = {
    inputText: 'TDD 너무 재밌다',
    labelText: '할 일',
    buttonText: {
      add: '추가',
      complete: '완료',
    },
  };

  const { inputText, labelText, buttonText: { add, complete } } = testText;

  const renderApp = () => render((
    <App />
  ));

  it('updates value upon changing of input value', () => {
    const { getByLabelText } = renderApp();

    const inputNode = getByLabelText(labelText);

    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    expect(inputNode).toHaveValue(inputText);
  });

  it('adds a task to tasks upon Clicking 추가 button', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText(labelText);
    const buttonNode = getByText(add);

    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    fireEvent.click(buttonNode);

    expect(container).toHaveTextContent(inputText);

    expect(inputNode).toHaveValue('');
  });

  it('removes the task from tasks upon clicking 완료 button along the task', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText(labelText);
    const addButtonNode = getByText(add);

    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    fireEvent.click(addButtonNode);

    expect(container).toHaveTextContent(inputText);

    fireEvent.click(getByText(complete));

    expect(container).not.toHaveTextContent(inputText);
  });
});
