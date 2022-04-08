import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('1. App 초기 빈배열 텍스트 출력', () => {
    const { container } = render(<App />);
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
