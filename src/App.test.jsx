import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  // 테스트가 실행되기 전에 실행
  beforeEach(() => {
    // mocking 함수들을 초기화
    jest.clearAllMocks();
  });

  it('initial', () => {
    // Given
    const { container, getByText, getByLabelText } = renderApp();

    // Then
    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(getByLabelText(/할 일/)).toBeInTheDocument();
    expect(getByText(/추가/)).toBeInTheDocument();
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  describe('when put text into input and click add button', () => {
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

  describe('when click finish button', () => {
    it('remove text and finish button', () => {
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

      // When
      fireEvent.click(getByText(/완료/));

      // Then
      expect(container).not.toHaveTextContent('운동하기');
    });
  });
});
