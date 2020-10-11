import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

const { click } = fireEvent;

function change(target, { value }) {
  fireEvent.change(target, {
    target: { value },
  });
}

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderApp() {
    const { container, getByLabelText, getByText } = render((
      <App />
    ));

    return {
      container,
      input: getByLabelText('할 일'),
      buttonAdd: getByText('추가'),
      findButtonComplete: () => getByText('완료'),
    };
  }

  context('when it renders', () => {
    it('renders Page', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('To-do');
    });
  });

  context('when 추가 button is clicked after task input', () => {
    const value = '커버리지 높이기';

    it('adds new task', () => {
      const { input, buttonAdd, container } = renderApp();

      change(input, { value });
      click(buttonAdd);

      expect(container).toHaveTextContent(value);
      expect(container).toHaveTextContent('완료');
    });
  });

  context('when 완료 button is clicked on an existing task', () => {
    const value = '커버리지 높이기';

    it('removes completed task', () => {
      const {
        input, buttonAdd, findButtonComplete, container,
      } = renderApp();

      change(input, { value });
      click(buttonAdd);

      click(findButtonComplete());

      expect(container).not.toHaveTextContent(value);
    });
  });
});
