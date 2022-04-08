import { fireEvent, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('1. App 초기 빈배열 텍스트 출력', () => {
    const { container } = render(<App />);
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('2. task 추가 테스트', () => {
    const { container, getByText, getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(
      input,
      { target: { value: '할일이 없어' } },
    );
    fireEvent.click(getByText('추가'));
    expect(input.value).toBe('');

    expect(container).toHaveTextContent('할일이 없어');
    expect(container).toHaveTextContent('완료');
  });
});
