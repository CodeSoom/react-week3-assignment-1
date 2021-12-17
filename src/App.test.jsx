import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('initial', () => {
    const { container, getByText, getByLabelText } = renderApp();
    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(getByText(/추가/)).toBeInTheDocument();
    expect(getByLabelText(/할 일/)).toBeInTheDocument(); // (/이름/)의 의미?
  });

  describe('when put text into input and click button', () => {
    it('show text and finish button', () => {
      // Given
      const { container, getByLabelText, getByText } = renderApp();

      // When
      fireEvent.change(getByLabelText(/할 일/), {
        target: { value: '운동하기' },
      });
      fireEvent.click(getByText(/추가/));

      // Then
      expect(container).toHaveTextContent('운동하기');
      expect(getByText(/완료/)).toBeInTheDocument();
    });
  });
});
