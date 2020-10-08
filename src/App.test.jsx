import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('when it renders', () => {
    it('renders a div', () => {
      const { container } = render((<App />));

      expect(container).toContainHTML('<div');
    });
  });

  context('when a new task is input', () => {
    const value = '커버리지 높이기';

    it('changes taskTitle', () => {
      const { getByLabelText } = render((<App />));
      const input = getByLabelText('할 일');

      expect(input.value).not.toBe(value);

      fireEvent.change(input, {
        target: { value },
      });

      expect(input.value).toBe(value);
    });
  });

  context('when 추가 button is clicked after task input', () => {
    const value = '커버리지 높이기';

    it('adds new task', () => {
      const { getByLabelText, getByText, container } = render((<App />));
      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: { value },
      });

      fireEvent.click(getByText('추가'));

      expect(container).toContainHTML(value);
    });
  });

  context('when 완료 button is clicked on an existing task', () => {
    const value = '커버리지 높이기';

    it('removes completed task', () => {
      const { getByLabelText, getByText, container } = render((<App />));
      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: { value },
      });

      fireEvent.click(getByText('추가'));

      fireEvent.click(getByText('완료'), 1);

      expect(container).not.toContainHTML(value);
    });
  });
});
