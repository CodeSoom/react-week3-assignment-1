import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders app', () => {
    const { container } = render((<App />));
    expect(container).toContainHTML('<div');
  });

  describe('when new task is input', () => {
    it('changes taskTitle', () => {
      const { getByLabelText } = render((<App />));
      const input = getByLabelText('할 일');
      const value = '커버리지 높이기';

      expect(input.value).not.toBe(value);

      fireEvent.change(input, {
        target: { value },
      });

      expect(input.value).toBe(value);
    });
  });

  describe('when 추가 button is clicked', () => {
    it('adds new task', () => {
      const { getByLabelText, getByText, container } = render((<App />));

      const input = getByLabelText('할 일');
      const value = '커버리지 높이기';

      fireEvent.change(input, {
        target: { value },
      });

      fireEvent.click(getByText('추가'));

      expect(container).toContainHTML(value);
    });
  });

  describe('when 완료 button is clicked', () => {
    it('removes completed task', () => {
      const { getByLabelText, getByText, container } = render((<App />));

      const input = getByLabelText('할 일');
      const value = '커버리지 높이기';

      fireEvent.change(input, {
        target: { value },
      });

      fireEvent.click(getByText('추가'));

      fireEvent.click(getByText('완료'), 1);

      expect(container).not.toContainHTML(value);
    });
  });
});
