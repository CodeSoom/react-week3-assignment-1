import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('App 컴포너트가 렌더링 되는 지 확인', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  context('task를 추가했을 때', () => {
    it('input창은 초기화 되고 추가한 태스크를 보여준다.', () => {
      const textContent = '코드숨 과제하기';
      const { getByPlaceholderText, getByText } = render(<App />);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: textContent } });
      fireEvent.click(getByText('추가'));

      expect(input.value).toBe('');
    });
  });

  context('task를 추가하고 완료 버튼을 눌렀을 때', () => {
    it('할일이 없어요를 보여준다.', () => {
      const textContent = '코드숨 과제하기';
      const { container, getByPlaceholderText, getByText } = render(<App />);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: textContent } });
      fireEvent.click(getByText('추가'));
      fireEvent.click(getByText('완료'));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
