import { fireEvent, render } from '@testing-library/react';

import App from './App';

// App
//  -renders App
// 1. when input and click "추가" button
//  -renders text
// 2. when click "완료" button
//  -remove text

describe('App', () => {
  const renderApp = () => render(<App />);

  it('renders App', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  context('when input and click "추가" button', () => {
    it('renders text', () => {
      const { container, getByLabelText, getByText } = renderApp();

      fireEvent.change(getByLabelText(/할 일/), {
        target: { value: '운동하기' },
      });
      fireEvent.click(getByText(/추가/));

      expect(container).toHaveTextContent('운동하기');
    });
  });

  context('when click "완료" button', () => {
    it('remove text', () => {
      const {
        container, getByLabelText, getByText, getAllByText,
      } = renderApp();

      fireEvent.change(getByLabelText(/할 일/), {
        target: { value: '운동하기' },
      });
      fireEvent.click(getByText(/추가/));

      expect(container).toHaveTextContent('운동하기');

      fireEvent.click(getAllByText(/완료/)[0]);

      expect(container).not.toHaveTextContent('운동하기');
    });
  });
});
