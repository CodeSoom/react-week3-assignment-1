import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const value = 'TDD 너무 재밌다';

  const labelText = '할 일';

  const buttonText = {
    add: '추가',
    complete: '완료',
  };

  const renderApp = () => render((
    <App />
  ));

  it('updates value upon changing of input value', () => {
    const { getByLabelText } = renderApp();

    const inputNode = getByLabelText(labelText);

    fireEvent.change(inputNode, {
      target: {
        value,
      },
    });

    expect(inputNode).toHaveValue(value);
  });

  it('adds a task to tasks upon Clicking 추가 button', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText(labelText);
    const buttonNode = getByText(buttonText.add);

    fireEvent.change(inputNode, {
      target: {
        value,
      },
    });

    fireEvent.click(buttonNode);

    expect(container).toHaveTextContent(value);

    expect(inputNode).toHaveValue('');
  });

  it('removes the task from tasks upon clicking 완료 button along the task', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText(labelText);
    const addButtonNode = getByText(buttonText.add);

    fireEvent.change(inputNode, {
      target: {
        value,
      },
    });

    fireEvent.click(addButtonNode);

    expect(container).toHaveTextContent(value);

    fireEvent.click(getByText(buttonText.complete));

    expect(container).not.toHaveTextContent(value);
  });
});
