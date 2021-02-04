import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <App />
  ));

  it(('updates value upon changing of input value'), () => {
    const { getByLabelText } = renderApp();

    const inputNode = getByLabelText('input-task');

    fireEvent.change(inputNode, {
      target: {
        value: 'TDD 너무 재밌다',
      },
    });

    expect(inputNode).toHaveValue('TDD 너무 재밌다');
  });

  it('adds a task to tasks upon Clicking 추가 button', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText('input-task');
    const buttonNode = getByText('추가');

    fireEvent.change(inputNode, {
      target: {
        value: 'TDD 너무 재밌다',
      },
    });

    fireEvent.click(buttonNode);

    expect(container).toHaveTextContent('TDD 너무 재밌다');
  });

  it('resets input value to empty string after clicking 추가 button', () => {
    const { getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText('input-task');
    const buttonNode = getByText('추가');

    fireEvent.change(inputNode, {
      target: {
        value: 'TDD 너무 재밌다',
      },
    });

    fireEvent.click(buttonNode);

    expect(inputNode).toHaveValue('');
  });

  it('removes the task from tasks upon clicking 완료 button', () => {
    const { container, getByText, getByLabelText } = renderApp();

    const inputNode = getByLabelText('input-task');
    const addButtonNode = getByText('추가');

    fireEvent.change(inputNode, {
      target: {
        value: 'TDD 너무 재밌다',
      },
    });

    fireEvent.click(addButtonNode);

    expect(container).toHaveTextContent('TDD 너무 재밌다');

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('TDD 너무 재밌다');
  });
});
