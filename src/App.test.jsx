import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('when render', () => {
    it('return empty message', () => {
      const { container } = render(<App />);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('when 완료 button click', () => {
    it('remove Item', () => {
      const { container, getByText } = render(<App />);
      const inputText = '내 앞에 무서운 애가 앉아있다.';

      expect(container).toHaveTextContent('할 일이 없어요!');

      fireEvent.change(container.querySelector('input'), {
        target: { value: inputText },
      });
      fireEvent.click(container.querySelector('button'));

      expect(container).toHaveTextContent(inputText);

      fireEvent.click(getByText('완료'));

      expect(container).not.toHaveTextContent(inputText);
    });
  });

  context('when add data', () => {
    it('add Item', () => {
      const { container } = render(<App />);
      const inputText = '내 앞에 무서운 애가 앉아있다.';

      fireEvent.change(container.querySelector('input'), {
        target: { value: inputText },
      });
      fireEvent.click(container.querySelector('button'));

      expect(container).toHaveTextContent(inputText);
    });
  });
});
